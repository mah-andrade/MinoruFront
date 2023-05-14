import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where,
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
        where('contrato', '==', 'ATIVO')
      ),
      {
        idField: 'id',
      }
    ) as Observable<Mensalistas[]>;
  }
}
