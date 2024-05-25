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
      qtdAdultos: params.qtdAdultos,
      qtdCriancasAdolescentes: params.qtdCriancasAdolescentes,
      receptionTeam: params.reception
    }).then(cultRef => {
      const cultId = cultRef.id;
      this.firestore.doc(`cult/${cultId}`).update ({
        id: cultId
      })
      console.log('Visitor created with ID:', cultId);
    })
    .catch(error => {
      console.error('Error creating visitor:', error);
    });;
  }

  createVisitor(params: Visitor){
    this.firestore.collection('visitor').add({
     name: params.name,
     phone: params.phone,
     visitedCult: params.visitedCult
   }).then(visitorRef => {
    const visitorId = visitorRef.id;
    this.firestore.doc(`visitor/${visitorId}`).update ({
      id: visitorId
    })
    console.log('Visitor created with ID:', visitorId);
  })
  .catch(error => {
    console.error('Error creating visitor:', error);
  });
 }

 createReceptionTeam(params: ReceptionTeam){
  this.firestore.collection('receptionTeam').add({
   name: params.name,
   lead: params.lead,
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

  async findReceptionTeam(): Promise<ReceptionTeam[]> {
    try {
      const collectionRef = this.firestore.collection('receptionTeam');
      const querySnapshot = await collectionRef.get().toPromise();

      if (!querySnapshot) {
        console.error('Erro ao buscar documentos');
        return [];
      }

      if (querySnapshot.empty) {
        console.log('Nenhum documento encontrado');
        return [];
      }

      const documents: ReceptionTeam[] = [];
      querySnapshot.forEach(doc => {
        documents.push(doc.data() as ReceptionTeam);
      });

      return documents;
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
      throw error;
    }
  }
}

type Cult = {
  id: string;
  data: Date;
  tema: string;
  pregador: string;
  qtdAdultos: number;
  qtdCriancasAdolescentes: number;
  qtdVisitas: number,
  reception: string
}

type Visitor = {
  id: string;
  name: string;
  phone: string;
  visitedCult: string
}

type ReceptionTeam = {
  name: string;
  lead: string;
}
