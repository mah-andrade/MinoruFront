import { Component, OnInit, ViewChild } from '@angular/core';
import {
  QuerySnapshot,
  collection,
  onSnapshot,
  query,
  where,
} from '@angular/fire/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Garagem } from 'src/app/models/garagem';
import { GaragemService } from 'src/app/services/garagem.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogAdicionarComponent } from './dialog-adicionar/dialog-adicionar.component';
import { DialogFinalizarComponent } from './dialog-finalizar/dialog-finalizar.component';
import { DialogEditarComponent } from './dialog-editar/dialog-editar.component';

@Component({
  selector: 'app-garagem',
  templateUrl: './garagem.component.html',
  styleUrls: ['./garagem.component.css'],
})
export class GaragemComponent implements OnInit {
  ELEMENT_DATA: Garagem[] = [];

  displayedColumns: string[] = ['position', 'name', 'weight', 'acoes'];
  dataSource = new MatTableDataSource<Garagem>(this.ELEMENT_DATA);

  constructor(
    private garagemService: GaragemService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.garagemService.getAllCars().subscribe((garagem) => {
      this.ELEMENT_DATA = garagem;

      this.dataSource = new MatTableDataSource<Garagem>(garagem);
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';

    this.dialog.open(DialogAdicionarComponent, dialogConfig);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  editUser(garagem: Garagem) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = garagem;

    this.dialog.open(DialogFinalizarComponent, dialogConfig);
  }

  finalizar(garagem: Garagem) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = garagem;

    this.dialog.open(DialogEditarComponent, dialogConfig);
  }
}
