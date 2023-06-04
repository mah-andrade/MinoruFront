import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Mensalistas } from 'src/app/models/mensalistas';
import { GaragemService } from 'src/app/services/garagem.service';

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
    private garagem: GaragemService
  ) {}

  valorPagar: string;
  mensalista: Mensalistas;

  ngOnInit(): void {
    this.mensalista = this.data;
    this.calculaValor();
  }

  finalizar() {}

  dialogClose() {
    this.dialogRef.close();
  }

  calculaValor() {
    let valorMensal;
    this.garagem.returnDocument(this.mensalista.veiculo).then(
      (dados) => {
        this.valorPagar = this.formatNumber(dados['mensal']);
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
