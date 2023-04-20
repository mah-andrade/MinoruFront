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

@Component({
  selector: 'app-garagem',
  templateUrl: './garagem.component.html',
  styleUrls: ['./garagem.component.css'],
})
export class GaragemComponent implements OnInit {
  ELEMENT_DATA: Garagem[] = [];

  displayedColumns: string[] = ['position', 'name', 'weight', 'acoes'];
  dataSource = new MatTableDataSource<Garagem>(this.ELEMENT_DATA);

  constructor(private garagemService: GaragemService) {}

  ngOnInit() {
    this.garagemService.getAllStudents().subscribe((garagem) => {
      this.ELEMENT_DATA = garagem;
      this.dataSource = new MatTableDataSource<Garagem>(garagem);
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  onCreate() {}

  ngAfterViewInit() {
    //this.atualizarDoc();
    this.dataSource.paginator = this.paginator;
  }
}
