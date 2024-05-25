import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CultControlService implements OnInit {

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  createData(params: Cult){
     this.firestore.collection('cult').add({
      data: params.data,
      tema: params.tema,
      pregador: params.pregador,
    });
  }

  createVisitor(params: Visitor){
    this.firestore.collection('visitor').add({
     name: params.name,
     phone: params.phone,
   });
 }

  async findData(): Promise<Cult[]> {
    try {
      const collectionRef = this.firestore.collection('cult');
      const querySnapshot = await collectionRef.get().toPromise();

      if (!querySnapshot) {
        console.error('Erro ao buscar documentos');
        return [];
      }

      if (querySnapshot.empty) {
        console.log('Nenhum documento encontrado');
        return [];
      }

      const documents: Cult[] = [];
      querySnapshot.forEach(doc => {
        documents.push(doc.data() as Cult);
      });

      return documents;
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
      throw error;
    }
  }
}

type Cult = {
  data: Date;
  tema: string;
  pregador: string;
}

type Visitor = {
  name: string;
  phone: string;
}

