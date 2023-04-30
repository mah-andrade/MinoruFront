import { Injectable, Query } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  documentId,
  getDoc,
  getDocs,
  orderBy,
  where,
  query,
  FieldPath,
} from '@angular/fire/firestore';
import { Garagem } from '../models/garagem';
import { Observable } from 'rxjs';
import { lavagem } from '../models/lavagem';

@Injectable({
  providedIn: 'root',
})
export class GaragemService {
  lavagem: lavagem = {
    modelo: '',
    placa: '',
    status: '',
    horaSolicitada: '',
  };

  constructor(private firestore: Firestore) {}

  addCar(garagem: Garagem) {
    return addDoc(this.getCollection(), garagem);
  }

  getAllCars(): Observable<Garagem[]> {
    return collectionData(this.getCollection(), {
      idField: 'id',
    }) as Observable<Garagem[]>;
  }

  getCollection() {
    const vecRef = collection(
      this.firestore,
      'Veiculo',
      'DIAS',
      this.dataAtual()
    );
    return vecRef;
  }

  async getDocument(garagem: Garagem) {
    //const doc = doc(this.getCollection,'id',id)
    //return query(this.getCollection(),where(FieldPath.documentId(), '==' , id));
  }

  addLavagem(garagem: Garagem) {
    this.lavagem.modelo = garagem.modelo;
    this.lavagem.placa = garagem.placa;
    this.lavagem.horaSolicitada = garagem.horaInicial;
    this.lavagem.status = 'PENDENTE';
    const lav = collection(
      this.firestore,
      'Lavagens',
      'DIAS',
      this.dataAtual()
    );
    return addDoc(lav, this.lavagem);
  }

  dataAtual() {
    var dataHoje = new Date();
    var diaHoje = dataHoje.getDate().toString();
    var mesHoje = dataHoje.getMonth().toString();
    var anoHoje = dataHoje.getFullYear().toString();
    mesHoje = (parseInt(mesHoje) + 1).toString();

    if (mesHoje.length === 1) {
      mesHoje = '0' + mesHoje;
    }
    if (diaHoje.length === 1) {
      diaHoje = '0' + diaHoje;
    }
    return diaHoje + '.' + mesHoje + '.' + anoHoje;
  }
}
