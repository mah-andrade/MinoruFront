import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Mensalistas } from 'src/app/models/mensalistas';
import { MensalistasService } from 'src/app/services/mensalistas.service';

@Component({
  selector: 'app-dialog-edit-mensal',
  templateUrl: './dialog-edit-mensal.component.html',
  styleUrls: ['./dialog-edit-mensal.component.css'],
})
export class DialogEditMensalComponent implements OnInit {
  nome = new FormControl(null, Validators.minLength(3));
  telefone = new FormControl(null);
  modelo = new FormControl(null, Validators.minLength(3));
  placa = new FormControl(null);
  checkButton = new FormControl(null);
  radioButton = new FormControl(null);
  dataNascimento = new FormControl(null);
  cpf = new FormControl(null);
  endereco = new FormControl(null, Validators.minLength(3));
  email = new FormControl(null, Validators.email);

  checkAcessSistem = new FormControl(null, Validators.required);
  checkConvenio = new FormControl(null, Validators.required);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogEditMensalComponent>,
    private mensalitasService: MensalistasService,
    private toast: ToastrService
  ) {}

  mensalistas: Mensalistas;
  ngOnInit(): void {
    this.mensalistas = this.data;
    if (this.mensalistas.email === '') {
    } else {
      if (this.mensalistas.acessAccount) {
        this.email.disable();
      }
    }
  }
  isValidDate(date: string): boolean {
    let resultado = date.split('/');
    let dia = Number(resultado[0]);
    let mes = Number(resultado[1]);
    let ano = Number(resultado[2]);

    if (mes > 12 || mes <= 0 || dia > 31 || dia <= 0) {
      return true;
    } else {
      return false;
    }
  }

  dialogClose() {
    this.dialogRef.close();
  }

  update() {
    if (this.isValidDate(this.mensalistas.dataNascimento)) {
      this.mensalistas.dataNascimento = '';
      this.toast.error('ERRO: Data invalida');
    } else {
      this.mensalitasService.updateMensal(this.mensalistas).then(
        (sucess) => {
          this.dialogRef.close();
          this.toast.success('Alterado com Sucesso!');
        },
        (errr) => {
          this.toast.success('Erro na alteração');
        }
      );
    }
  }

  validaEmail(): boolean {
    if (this.validEmail(this.mensalistas.email)) return true;
    else {
      return false;
    }
  }

  validEmail(email) {
    return /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);
  }

  validaCampos(): boolean {
    if (
      this.nome.valid &&
      this.telefone.valid &&
      this.modelo.valid &&
      this.placa.valid &&
      this.checkButton.valid &&
      this.radioButton.valid &&
      this.dataNascimento.valid &&
      this.cpf.valid &&
      this.endereco.valid
    ) {
      if (
        this.mensalistas.nome.trim().length >= 3 &&
        this.mensalistas.modelo.trim().length >= 3 &&
        this.mensalistas.endereco.trim().length >= 3
      ) {
        if (this.validaEmail()) {
          if (this.email.valid) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
