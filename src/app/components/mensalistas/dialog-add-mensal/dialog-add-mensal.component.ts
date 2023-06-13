import { Component, OnInit } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { el } from 'date-fns/locale';
import { ToastrService } from 'ngx-toastr';
import { Mensalistas } from 'src/app/models/mensalistas';
import { GaragemService } from 'src/app/services/garagem.service';
import { MensalistasService } from 'src/app/services/mensalistas.service';

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
    acessAccount: false,
    profileURL: '',
    convenio: false,
  };

  valorCar: number;
  valorMoto: number;

  valorPagar: string;

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

  //check checkbox
  checkAcessSistem = new FormControl(null, Validators.required);
  checkConvenio = new FormControl(null, Validators.required);

  constructor(
    public dialogRef: MatDialogRef<DialogAddMensalComponent>,
    private mensalService: MensalistasService,
    private toast: ToastrService,
    private garagem: GaragemService
  ) {}

  ngOnInit(): void {
    let valoresEst: Object;
    this.garagem.returnDocument('CARRO').then((dados) => {
      valoresEst = dados;

      this.valorCar = valoresEst['mensal'];
    });

    this.garagem.returnDocument('Moto').then((dados) => {
      valoresEst = dados;

      this.valorMoto = valoresEst['mensal'];
    });

    this.valorPagar = 'R$ 0';
  }

  dialogClose() {
    this.dialogRef.close();
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

  cadastrar() {
    let email = this.mensalistas.cpf;
    email = email.replace('.', '');
    email = email.replace('.', '');
    email = email.replace('-', '');

    if (!this.testaCPF(email)) {
      this.mensalistas.cpf = '';
      this.toast.error('Cpf invalido! por favor digite um cpf valido!');
    } else if (this.getIdade(this.mensalistas.dataNascimento)) {
      this.mensalistas.dataNascimento = '';
      this.toast.error('ERRO: Menor de 18 anos ou ano superior a 2023');
    } else if (this.isValidDate(this.mensalistas.dataNascimento)) {
      this.mensalistas.dataNascimento = '';
      this.toast.error('ERRO: Data invalida');
    } else {
      let dataAtual = new Date();

      this.mensalistas.InicioContrato = this.formatDate(
        dataAtual.getDate(),
        dataAtual.getMonth() + 1,
        dataAtual.getFullYear()
      ).toString();

      let dataVencimento = new Date();
      let dataAtualizada = this.addDays(dataVencimento, 30);

      this.mensalistas.VencimentoContrato = this.formatDate(
        dataAtualizada.getDate(),
        dataAtualizada.getMonth() + 1,
        dataAtualizada.getFullYear()
      ).toString();

      this.mensalistas.contrato = true;

      if (this.checkConvenio.valid) {
        this.mensalistas.convenio = true;
      }

      if (this.checkAcessSistem.valid) {
        const auth = getAuth();
        const email = this.mensalistas.email;
        var senhaAux = this.mensalistas.dataNascimento.replace('/', '');
        senhaAux = senhaAux.replace('/', '');
        const senha = senhaAux;
        console.log('ACESSO EMAIL');
        createUserWithEmailAndPassword(auth, email, senha).then(
          (sucess) => {
            this.mensalistas.acessAccount = true;
            this.cadastrarBd(this.mensalistas).then((sucess) => {
              this.dialogRef.close();
              this.toast.success('SUCESSO AO CADASTRAR!');
            });
          },
          (err) => {
            this.toast.error('Email já cadastrado');
            this.mensalistas.email = '';
          }
        );
      } else {
        this.cadastrarBd(this.mensalistas).then(
          (sucess) => {
            this.dialogRef.close();
            this.toast.success('SUCESSO AO CADASTRAR!');
          },
          (err) => {
            console.log('ERRO AO CADASTRAR');
          }
        );
      }
    }
  }

  carMoto() {
    this.valorPagar = this.formatNumber(this.valorMoto);
  }

  carValor() {
    this.valorPagar = this.formatNumber(this.valorCar);
  }

  getIdade(data: string): boolean {
    let dataformat = data.split('/');

    if (parseInt(dataformat[1]) >= 12 && parseInt(dataformat[1]) <= 0) {
      return false;
    }

    let dataAtual = new Date();
    let dataNascimento18 = new Date(
      parseInt(dataformat[2]) + 18,
      parseInt(dataformat[1]),
      parseInt(dataformat[0])
    );

    let dataAtualMonth = new Date(
      dataAtual.getUTCFullYear(),
      dataAtual.getUTCMonth() + 1,
      dataAtual.getUTCDate()
    );
    return dataNascimento18 >= dataAtualMonth;
  }

  cadastrarBd(obj: Mensalistas) {
    return this.mensalService.addCar(obj);
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

  validaEmail(): boolean {
    if (this.validEmail(this.mensalistas.email)) return true;
    else {
      return false;
    }
  }

  testaCPF(strCPF): boolean {
    var Soma;
    var Resto;
    Soma = 0;

    if (strCPF == '00000000000') return false;
    if (strCPF == '11111111111') return false;
    if (strCPF == '22222222222') return false;
    if (strCPF == '33333333333') return false;
    if (strCPF == '44444444444') return false;
    if (strCPF == '55555555555') return false;
    if (strCPF == '66666666666') return false;
    if (strCPF == '77777777777') return false;
    if (strCPF == '88888888888') return false;
    if (strCPF == '99999999999') return false;

    for (var i = 1; i <= 9; i++)
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;
    Soma = 0;
    for (i = 1; i <= 10; i++)
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
  }

  addDays(date: Date, days: number) {
    date.setDate(date.getDate() + days);
    return date;
  }

  formatNumber(dados: Number): string {
    const formatter = dados.toLocaleString('pt-br', {
      currency: 'BRL',
      style: 'currency',
      minimumFractionDigits: 2,
    });
    return formatter;
  }

  validEmail(email) {
    return /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);
  }

  formatDate(dia: number, mes: number, ano: number): String {
    var diaFim, meFim, anoFim;
    if (dia < 10) {
      diaFim = '0' + dia;
    } else {
      diaFim = dia;
    }
    if (mes < 10) {
      meFim = '0' + mes;
    } else {
      meFim = mes;
    }

    return diaFim + '/' + meFim + '/' + ano;
  }
}
