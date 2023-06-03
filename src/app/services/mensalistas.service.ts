import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  query,
  where,
  getFirestore,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { Mensalistas } from '../models/mensalistas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MensalistasService {
  constructor(private firestore: Firestore) {}

  getAllMensalistas(): Observable<Mensalistas[]> {
    return collectionData(
      query(
        collection(this.firestore, 'Mensalistas'),
        where('contrato', '==', true)
      ),
      {
        idField: 'id',
      }
    ) as Observable<Mensalistas[]>;
  }

  getCollection() {}

  addCar(mensalistas: Mensalistas) {
    return addDoc(collection(this.firestore, 'Mensalistas'), mensalistas);
  }

  updateMensal(mensalistas: Mensalistas) {
    const db = getFirestore();
    var docRef = doc(db, 'Mensalistas', mensalistas.id);
    return setDoc(docRef, mensalistas);
  }
}
