import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Mensalistas } from 'src/app/models/mensalistas';

@Component({
  selector: 'app-dialog-finalizar',
  templateUrl: './dialog-finalizar.component.html',
  styleUrls: ['./dialog-finalizar.component.css'],
})
export class DialogFinalizarComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogFinalizarComponent>,
    private toast: ToastrService
  ) {}

  valorPagar: number;
  mensalista: Mensalistas;
  ngOnInit(): void {
    this.mensalista = this.data;
  }

  finalizar() {}

  dialogClose() {
    this.dialogRef.close();
  }
}
