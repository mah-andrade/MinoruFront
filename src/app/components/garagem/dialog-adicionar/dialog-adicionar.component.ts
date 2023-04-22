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
  };

  nome = new FormControl(null, Validators.minLength(3));
  telefone = new FormControl(null);
  modelo = new FormControl(null, Validators.minLength(3));
  placa = new FormControl(null);
  checkButton = new FormControl();
  radioButton = new FormControl();
  checkLavagem = new FormControl();

  constructor(
    private garagemService: GaragemService,
    public dialogRef: MatDialogRef<DialogAdicionarComponent>,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {}

  cadastrar() {
    this.garagem.placa.toUpperCase();
    var horaAtual = new Date();
    this.garagem.horaInicial =
      horaAtual.getHours().toString() + ':' + horaAtual.getMinutes().toString();
    this.garagem.status = 'ATIVO';
    this.dialogRef.close();
    this.garagemService.adicionarVeiculo(this.garagem).then(
      () => {
        this.toast.success('Adicionado com sucesso!');
        if (this.checkLavagem.valid) {
          this.addLavagem();
        }
      },
      (err) => {
        this.toast.error('Erro ao adicionar o usuario!');
      }
    );
  }

  addLavagem() {
    this.garagemService.addLavagem(this.garagem);
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
