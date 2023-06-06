import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Garagem } from 'src/app/models/garagem';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GaragemService } from 'src/app/services/garagem.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-finalizar',
  templateUrl: './dialog-finalizar.component.html',
  styleUrls: ['./dialog-finalizar.component.css'],
})
export class DialogFinalizarComponent implements OnInit {
  garagem: Garagem = {
    nome: '',
    telefone: '',
    modelo: '',
    veiculo: '',
    cliente: '',
    horaInicial: '',
    placa: '',
    status: false,
    lavagem: false,
    statusLavagem: '',
    valor: 0,
    ordemLavagem: 0,
  };

  nome = new FormControl(null, Validators.minLength(3));
  telefone = new FormControl(null);
  modelo = new FormControl(null, Validators.minLength(3));
  placa = new FormControl(null);
  checkButton = new FormControl(null);
  radioButton = new FormControl(null);
  checkLavagem = new FormControl(null);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogFinalizarComponent>,
    private garaService: GaragemService,
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
  }

  update() {
    this.garaService.updateCar(this.garagem).then(
      () => {
        this.toast.success('Alterado com sucesso!');
      },
      (err) => {
        this.toast.error('Erro ao alterar!');
      }
    );
    this.dialogClose();
  }

  dialogClose() {
    this.dialogRef.close();
  }

  validaCampos(): boolean {
    if (
      this.nome.valid &&
      this.telefone.valid &&
      this.modelo.valid &&
      this.placa.valid &&
      this.checkButton.valid &&
      this.radioButton.valid
    ) {
      if (
        this.garagem.nome.trim().length >= 3 &&
        this.garagem.modelo.trim().length >= 3
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  validaHorario(): boolean {
    var hm = this.data.horaInicial;
    var aux = hm.split(':');
    var horaAtual = new Date();
    var hour, min;

    if (horaAtual.getHours() <= 9) {
      hour = '0' + horaAtual.getHours();
    } else {
      hour = horaAtual.getHours();
    }
    if (horaAtual.getMinutes() <= 9) {
      min = '0' + horaAtual.getMinutes();
    } else {
      min = horaAtual.getMinutes();
    }
    var auxSecond = this.converteSeconds(aux[0], aux[1]) + 300;
    if (this.converteSeconds(hour, min) < auxSecond) {
      return true;
    }
    return false;
  }

  deletar() {
    this.garaService.deleteCar(this.data.id);
    this.dialogClose();
  }

  converteSeconds(hh: any, mm: any): number {
    return hh * 60 * 60 + mm * 60;
  }

  validaLavagem(): boolean {
    if (this.data.lavagem === 'LAVAGEM') {
      return true;
    } else {
      return false;
    }
  }
}
