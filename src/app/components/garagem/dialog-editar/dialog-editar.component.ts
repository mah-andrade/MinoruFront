import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    private garagemservice: GaragemService
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
    this.dataFormat = dataAtual.getHours() + ':' + dataAtual.getMinutes();
  }

  dialogClose() {
    this.dialogRef.close();
  }

  calcularValor() {
    let valores = 0;
    let lavagem = 0;
    // 2 Possibilade avulso diario
    if (this.garagem.cliente === 'DIARIO') {
      let valoresEst: Object;

      this.garagemservice.returnDocument(this.garagem.veiculo).then((dados) => {
        valoresEst = dados;
        lavagem = valoresEst['diario'];
        valores = valoresEst['lavagem'];
        console.log('var ' + lavagem + 'var valor' + valores);
      });

      var recebe = this.garagemservice.returnValorDiario(this.garagem.veiculo);
      console.log(recebe);
      recebe.then(
        (succes) => {
          if (this.garagem.lavagem === 'LAVAGEM') {
            var docLavagem = this.garagemservice.returnValorLavagem(
              this.garagem.veiculo
            );
            docLavagem.then((succesLavagem) => {
              this.valorPagar = succes + succesLavagem;
            });
          } else {
            this.valorPagar = succes;
          }
        },
        (error) => {}
      );
    } else {
      var hour = this.garagem.horaInicial.split(':');
      var minInicial = this.converteMin(hour[0], hour[1]);
      var horaAtual = new Date();
      var minFinal = this.converteMin(
        horaAtual.getHours(),
        horaAtual.getMinutes()
      );

      //CAPTANDO OS VALORES NO BD

      var recebe = this.garagemservice.returnValor(
        this.garagem.cliente,
        this.garagem.veiculo
      );
      recebe.then(
        (dados) => {
          this.valorPagar = dados;
        },
        (err) => {}
      );

      if (minFinal - minInicial >= 60) {
        var hours = Math.floor((minFinal - minInicial) / 60);

        var recebe = this.garagemservice.returnValor(
          this.garagem.cliente,
          this.garagem.veiculo
        );
        recebe.then(
          (dados) => {
            this.valorPagar = dados * (hours + 1);
          },
          (err) => {}
        );

        this.valorPagar = this.valorPagar * (hours + 1);
      } else {
      }
    }
  }

  converteMin(hh: any, mm: any): number {
    hh = parseInt(hh);
    mm = parseInt(mm);
    var aux = hh * 60;
    aux += mm;
    return aux;
  }

  finalizar(valor: any) {
    console.log(valor);
    this.dialogRef.close();
  }
}
