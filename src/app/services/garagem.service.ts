import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  getDocs,
} from '@angular/fire/firestore';
import { Garagem } from '../models/garagem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GaragemService {
  constructor(private firestore: Firestore) {}

  adicionarVeiculo(garagem: Garagem) {
    const vecRef = collection(
      this.firestore,
      'Veiculo',
      'DIAS',
      this.dataAtual()
    );
    return addDoc(vecRef, garagem);
  }

  getAllStudents(): Observable<Garagem[]> {
    const vecRef = collection(
      this.firestore,
      'Veiculo',
      'DIAS',
      this.dataAtual()
    );
    return collectionData(vecRef, { idField: 'id' }) as Observable<Garagem[]>;
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
