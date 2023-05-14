import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { el } from 'date-fns/locale';
import { ToastrService } from 'ngx-toastr';
import { Garagem } from 'src/app/models/garagem';
import { GaragemService } from 'src/app/services/garagem.service';

@Component({
  selector: 'app-dialog-editar',
  templateUrl: './dialog-editar.component.html',
  styleUrls: ['./dialog-editar.component.css'],
})
export class DialogEditarComponent implements OnInit {
  garagem: Garagem = {
    nome: '',
    telefone: '',
    modelo: '',
    veiculo: '',
    cliente: '',
    horaInicial: '',
    placa: '',
    status: '',
    lavagem: '',
    statusLavagem: '',
  };

  dataFormat: string;
  valorPagar: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogEditarComponent>,
    private garagemservice: GaragemService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.garagem.nome = this.data.nome;
    this.garagem.placa = this.data.placa;
    this.garagem.telefone = this.data.telefone;
    this.garagem.modelo = this.data.modelo;
    this.garagem.veiculo = this.data.veiculo;
    this.garagem.cliente = this.data.cliente;
    this.garagem.id = this.data.id;
    this.garagem.horaInicial = this.data.horaInicial;
    this.garagem.lavagem = this.data.lavagem;
    this.garagem.statusLavagem = this.data.statusLavagem;
    this.garagem.status = this.data.status;

    this.calcularValor();

    var dataAtual = new Date();
    var auxhora, auxmin;

    if (dataAtual.getHours() < 10) {
      auxhora = '0' + dataAtual.getHours();
    } else {
      auxhora = dataAtual.getHours();
    }

    if (dataAtual.getMinutes() < 10) {
      auxmin = '0' + dataAtual.getMinutes();
    } else {
      auxmin = dataAtual.getMinutes();
    }
    this.dataFormat = auxhora + ':' + auxmin;
  }

  dialogClose() {
    this.dialogRef.close();
  }

  async calcularValor() {
    let avulso = 0;
    let lavagem = 0;
    let diario = 0;

    //PEGANDO O DOCUMENTO DO BD
    let valoresEst: Object;
    this.garagemservice.returnDocument(this.garagem.veiculo).then((dados) => {
      valoresEst = dados;
      lavagem = valoresEst['lavagem'];
      diario = valoresEst['diario'];
      avulso = valoresEst['avulso'];

      if (this.garagem.cliente === 'DIARIO') {
        if (this.garagem.lavagem === 'LAVAGEM') {
          this.valorPagar = diario + lavagem;
        } else {
          this.valorPagar = diario;
        }
      } else {
        var hour = this.garagem.horaInicial.split(':');
        var minInicial = this.converteMin(hour[0], hour[1]);
        var horaAtual = new Date();
        var minFinal = this.converteMin(
          horaAtual.getHours(),
          horaAtual.getMinutes()
        );

        if (minFinal - minInicial >= 60) {
          if (this.garagem.lavagem === 'LAVAGEM') {
            var hours = Math.floor((minFinal - minInicial) / 60);

            if (hours == 1) {
              this.valorPagar = avulso * (hours + 1) + lavagem;
            } else {
              this.valorPagar = avulso * hours + lavagem;
            }
          } else {
            var hours = Math.floor((minFinal - minInicial) / 60);
            this.valorPagar = avulso * (hours + 1);
          }
        } else {
          if (this.garagem.lavagem === 'LAVAGEM') {
            this.valorPagar = avulso + lavagem;
          } else {
            this.valorPagar = avulso;
          }
        }
      }
    });
  }

  converteMin(hh: any, mm: any): number {
    hh = parseInt(hh);
    mm = parseInt(mm);
    var aux = hh * 60;
    aux += mm;
    return aux;
  }

  finalizar(valor: any) {
    // salvar os valores

    let obj: Object;

    this.garagemservice.returnMensal().then((dados) => {
      obj = dados;
      var aux = dados['valorRendimento'];
      aux += valor;
      obj['valorRendimento'] = aux;
      this.garagemservice.updateRendimento(obj).then(
        (sucess) => {
          this.garagem.status = 'FINALIZADO';
          this.garagemservice.updateCar(this.garagem);
          this.dialogRef.close();
          this.toast.success('Finalizado com Sucesso');
        },
        (err) => {
          this.toast.error('ERRO');
        }
      );
    });
  }
}
