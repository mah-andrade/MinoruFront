import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Mensalistas } from 'src/app/models/mensalistas';

@Component({
  selector: 'app-dialog-add-mensal',
  templateUrl: './dialog-add-mensal.component.html',
  styleUrls: ['./dialog-add-mensal.component.css'],
})
export class DialogAddMensalComponent implements OnInit {
  mensalistas: Mensalistas = {
    nome: '',
    InicioContrato: '',
    VencimentoContrato: '',
    contrato: false,
    cpf: '',
    dataNascimento: '',
    email: '',
    endereco: '',
    modelo: '',
    placa: '',
    tel: '',
    veiculo: '',
  };

  nome = new FormControl(null, Validators.minLength(3));
  telefone = new FormControl(null);
  modelo = new FormControl(null, Validators.minLength(3));
  placa = new FormControl(null);
  checkButton = new FormControl(null);
  radioButton = new FormControl(null);
  checkLavagem = new FormControl(null, Validators.required);
  dataNascimento = new FormControl(null);
  cpf = new FormControl(null);
  endereco = new FormControl(null);
  email = new FormControl(null, Validators.email);

  //check checkbox
  checkAcessSistem = new FormControl(null, Validators.required);

  constructor(public dialogRef: MatDialogRef<DialogAddMensalComponent>) {}

  ngOnInit(): void {}

  dialogClose() {
    this.dialogRef.close();
  }

  cadastrar() {}

  validaCampos(): boolean {
    if (
      this.nome.valid &&
      this.telefone.valid &&
      this.modelo.valid &&
      this.placa.valid &&
      this.checkButton.valid &&
      this.radioButton.valid &&
      this.checkLavagem.valid &&
      this.dataNascimento.valid &&
      this.cpf.valid &&
      this.endereco.valid &&
      this.email.valid
    ) {
      return true;
    } else {
      return false;
    }
  }
}
