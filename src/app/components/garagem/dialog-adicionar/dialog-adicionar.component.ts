import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Garagem } from 'src/app/models/garagem';
import { GaragemService } from 'src/app/services/garagem.service';

@Component({
  selector: 'app-dialog-adicionar',
  templateUrl: './dialog-adicionar.component.html',
  styleUrls: ['./dialog-adicionar.component.css'],
})
export class DialogAdicionarComponent implements OnInit {
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

  nome = new FormControl(null, Validators.minLength(3));
  telefone = new FormControl(null);
  modelo = new FormControl(null, Validators.minLength(3));
  placa = new FormControl(null);
  checkButton = new FormControl(null);
  radioButton = new FormControl(null);
  checkLavagem = new FormControl(null, Validators.required);

  constructor(
    private garagemService: GaragemService,
    public dialogRef: MatDialogRef<DialogAdicionarComponent>,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {}

  cadastrar() {
    var horaAtual = new Date();
    var min, hour;

    if (horaAtual.getHours() <= 9) {
      hour = '0' + horaAtual.getHours();
    } else {
      hour = horaAtual.getHours();
    }

    console.log();
    if (horaAtual.getMinutes() <= 9) {
      min = '0' + horaAtual.getMinutes();
    } else {
      min = horaAtual.getMinutes();
    }

    if (this.checkLavagem.valid) {
      this.garagem.lavagem = 'LAVAGEM';
      this.garagem.statusLavagem = 'PENDENTE';
    }

    this.garagem.horaInicial = hour + ':' + min;
    this.garagem.status = 'ATIVO';
    this.garagem.placa = this.garagem.placa.toUpperCase();
    this.dialogRef.close();
    this.garagemService.addCar(this.garagem).then(
      () => {
        this.toast.success('Adicionado com sucesso!');
      },
      (err) => {
        this.toast.error('Erro ao adicionar o usuario!');
      }
    );
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

  dialogClose() {
    this.dialogRef.close();
  }
}
