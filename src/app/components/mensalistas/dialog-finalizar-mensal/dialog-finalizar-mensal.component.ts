import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Mensalistas } from 'src/app/models/mensalistas';
import { GaragemService } from 'src/app/services/garagem.service';
import { MensalistasService } from 'src/app/services/mensalistas.service';

@Component({
  selector: 'app-dialog-finalizar-mensal',
  templateUrl: './dialog-finalizar-mensal.component.html',
  styleUrls: ['./dialog-finalizar-mensal.component.css'],
})
export class DialogFinalizarMensalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogFinalizarMensalComponent>,
    private toast: ToastrService,
    private garagem: GaragemService,
    private mensalistaService: MensalistasService
  ) {}
  valorPagarAux: number;
  valorPagar: string;
  mensalista: Mensalistas;
  valorDescontoAux: string;

  ngOnInit(): void {
    this.mensalista = this.data;
    this.calculaValor();
  }

  renovar(mensalista: Mensalistas) {
    var auxString = mensalista.VencimentoContrato.split('/');
    var date = new Date(auxString[1] + '-' + auxString[0] + '-' + auxString[2]);
    var dataAtualizada = this.addDays(date, 30);
    mensalista.VencimentoContrato = this.formatDate(
      dataAtualizada.getDate(),
      dataAtualizada.getMonth() + 1,
      dataAtualizada.getFullYear()
    ).toString();
    this.mensalistaService.updateMensal(mensalista).then((sucess) => {
      let obj: Object;
      this.garagem.returnMensal().then((sucess) => {
        obj = sucess;
        let aux = sucess['valorRendimento'];
        console.log(aux);
        aux += this.valorPagarAux;
        obj['valorRendimento'] = aux;
        this.garagem.updateAddMensal(obj).then((suces) => {
          this.dialogRef.close();
          this.toast.success('Sucesso ao renovar o cliente mensalista');
        });
      });
    });
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
  addDays(date: Date, days: number) {
    date.setDate(date.getDate() + days);
    return date;
  }

  dialogClose() {
    this.dialogRef.close();
  }

  calculaValor() {
    let valorMensal;
    this.garagem.returnDocument(this.mensalista.veiculo).then(
      (dados) => {
        var auxMoney = dados['mensal'];
        var desconto = auxMoney * 0.08;

        if (this.mensalista.convenio) {
          this.valorDescontoAux = this.formatNumber(desconto);
          this.valorPagar = this.formatNumber(auxMoney - desconto);
        } else {
          this.valorDescontoAux = 'Nao tem desconto';
          this.valorPagar = this.formatNumber(auxMoney);
        }
      },
      (err) => {}
    );
  }

  formatNumber(dados: Number): string {
    const formatter = dados.toLocaleString('pt-br', {
      currency: 'BRL',
      style: 'currency',
      minimumFractionDigits: 2,
    });
    return formatter;
  }
}
