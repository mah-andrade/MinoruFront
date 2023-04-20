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

    //this.atualizarDoc();
    //this.atualizarteste();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /*async atualizarDoc() {
    const variosDoc = await this.garagemService.getAllStudents();
    variosDoc.forEach((docs) => {
      console.log(docs.id, '=>', docs.data());
    });
  }*/

  atualizarteste() {
    const q = query(
      this.garagemService.getCollection(),
      where('status', '==', 'ATIVO')
    );
    const ativos = onSnapshot(q, (QuerySnapshot) => {
      QuerySnapshot.forEach((doc) => {
        console.log(doc.data());
      });
    });
  }

  ngAfterViewInit() {
    //this.atualizarDoc();
    this.dataSource.paginator = this.paginator;
  }
}
