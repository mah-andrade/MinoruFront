import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Garagem } from 'src/app/models/garagem';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogFinalizarComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  update() {}

  dialogClose() {
    this.dialogRef.close();
  }

  validaCampos(): boolean {
    return true;
  }
}
