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
  deleteDoc,
  getFirestore,
  setDoc,
  CollectionReference,
} from '@angular/fire/firestore';
import { Garagem } from '../models/garagem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GaragemService {
  constructor(private firestore: Firestore) {}

  addCar(garagem: Garagem) {
    return addDoc(this.getCollection(), garagem);
  }

  getAllCars(): Observable<Garagem[]> {
    return collectionData(
      query(this.getCollection(), where('status', '==', 'ATIVO')),
      {
        idField: 'id',
      }
    ) as Observable<Garagem[]>;
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

  updateCar(garagem: Garagem) {
    const db = getFirestore();
    const docRef = doc(db, 'Veiculo/DIAS/' + this.dataAtual(), garagem.id);
    return setDoc(docRef, garagem);
  }

  deleteCar(id: string) {
    const db = getFirestore();
    const docRef = doc(db, 'Veiculo/DIAS/' + this.dataAtual(), id);
    return deleteDoc(docRef);
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

  async returnDocument(veiculo: string) {
    const db = getFirestore();
    var docRef;

    if (veiculo === 'CARRO') {
      docRef = doc(db, 'ValorEstacionamento', 'Carro');
    } else {
      docRef = doc(db, 'ValorEstacionamento', 'Moto');
    }
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return 'ERROR';
    }
  }

  async returnMensal() {
    var data = new Date();
    const db = getFirestore();
    var docRef = doc(
      db,
      'Mensal',
      data.getMonth() + 1 + data.getFullYear().toString()
    );

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return 'ERROR';
    }
  }

  updateRendimento(Obj: Object) {
    var data = new Date();
    const db = getFirestore();
    var docRef = doc(
      db,
      'Mensal',
      data.getMonth() + 1 + data.getFullYear().toString()
    );
    return setDoc(docRef, Obj);
  }

  async quantityCars() {
    const db = getFirestore();
    const q = query(this.getCollection(), where('status', '==', 'ATIVO'));

    const querySnapshot = await getDocs(q);

    return querySnapshot.size;
  }
  updateAddMensal(Obj: Object) {
    var data = new Date();
    const db = getFirestore();
    var docRef = doc(
      db,
      'Mensal',
      data.getMonth() + 1 + data.getFullYear().toString()
    );
    return setDoc(docRef, Obj);
  }
}
