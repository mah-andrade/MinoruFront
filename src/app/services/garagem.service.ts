import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  getDocs,
  orderBy,
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
