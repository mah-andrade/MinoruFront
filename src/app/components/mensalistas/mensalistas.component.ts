import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Garagem } from 'src/app/models/garagem';
import { Mensalistas } from 'src/app/models/mensalistas';
import { GaragemService } from 'src/app/services/garagem.service';
import { MensalistasService } from 'src/app/services/mensalistas.service';
import { DialogAddMensalComponent } from './dialog-add-mensal/dialog-add-mensal.component';
import { DialogEditMensalComponent } from './dialog-edit-mensal/dialog-edit-mensal.component';
import { DialogFinalizarMensalComponent } from './dialog-finalizar-mensal/dialog-finalizar-mensal.component';

@Component({
  selector: 'app-mensalistas',
  templateUrl: './mensalistas.component.html',
  styleUrls: ['./mensalistas.component.css'],
})
export class MensalistasComponent implements OnInit {
  ELEMENT_DATA: Mensalistas[] = [];

  displayedColumns: string[] = ['position', 'name', 'weight', 'acoes'];
  dataSource = new MatTableDataSource<Mensalistas>(this.ELEMENT_DATA);

  constructor(
    private mensalistasServices: MensalistasService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.mensalistasServices.getAllMensalistas().subscribe((garagem) => {
      this.ELEMENT_DATA = garagem;
      this.dataSource = new MatTableDataSource<Mensalistas>(garagem);
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  abrirDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';

    this.dialog.open(DialogAddMensalComponent, dialogConfig);
  }

  openCheck(mensalista: Mensalistas) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = mensalista;

    this.dialog.open(DialogFinalizarMensalComponent, dialogConfig);
  }

  openEdit(mensalista: Mensalistas) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = mensalista;

    this.dialog.open(DialogEditMensalComponent, dialogConfig);
  }
}
