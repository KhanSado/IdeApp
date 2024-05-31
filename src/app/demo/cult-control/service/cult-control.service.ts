import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CultControlService implements OnInit {

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

createCult(params: Cult): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if ((params.data.toString().length > 0)
      && (params.pregador.length > 0)
      && (params.qtdAdultos.toString().length > 0)
      && (params.qtdCriancasAdolescentes.toString().length > 0)
      && (params.reception.length > 0)
      && (params.tema.length > 0)) {

      this.firestore.collection('cult').add({
        data: params.data,
        tema: params.tema,
        pregador: params.pregador,
        qtdAdultos: params.qtdAdultos,
        qtdCriancasAdolescentes: params.qtdCriancasAdolescentes,
        receptionTeam: params.reception
      }).then(cultRef => {
        const cultId = cultRef.id;
        return this.firestore.doc(`cult/${cultId}`).update({
          id: cultId
        }).then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Novo culto adicionado",
            showConfirmButton: true,
            confirmButtonText: "Ok",
            timer: 1500
          });
          resolve();
        });
      }).catch(error => {
        console.error('Error creating cult:', error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocorreu um erro ao cadastrar o culto"
        });
        reject(error);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, preencha todos os campos."
      });
      reject(new Error('Invalid input'));
    }
  });
}
createVisitor(params: Visitor): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (params.name.length > 0 && params.phone.length > 0 && params.visitedCult.length > 0) {
      this.firestore.collection('visitor').add({
        name: params.name,
        phone: params.phone,
        recievVisit: params.recievVisit,
        visitedCult: params.visitedCult
      }).then(visitorRef => {
        const visitorId = visitorRef.id;
        return this.firestore.doc(`visitor/${visitorId}`).update({
          id: visitorId
        }).then(() => {
          return this.firestore.doc(`cult/${params.visitedCult}`).update({
            qtdVisitas: firebase.firestore.FieldValue.increment(1)
          });
        }).then(() => {

          console.log('Visitor created with ID:', visitorId);

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Novo Visitante adicionado",
            showConfirmButton: true,
            confirmButtonText: "Ok",
            timer: 1500
          });
          resolve();
        });
      }).catch(error => {
        console.error('Error creating visitor:', error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocorreu um erro ao cadastrar novo visitante"
        });
        reject(error);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, preencha todos os campos."
      });
      reject(new Error('Invalid input'));
    }
  });
}

createReceptionTeam(params: ReceptionTeam): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (params.name.length > 0 && params.lead.length > 0) {
      this.firestore.collection('receptionTeam').add({
        name: params.name,
        lead: params.lead
      }).then(receptionTeamRef => {
        const receptionTeamId = receptionTeamRef.id;
        return this.firestore.doc(`receptionTeam/${receptionTeamId}`).update({
          id: receptionTeamId
        }).then(() => {
          console.log('Reception Team created with ID:', receptionTeamId);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Nova equipe de recepção adicionada",
            showConfirmButton: true,
            confirmButtonText: "Ok",
            timer: 1500
          });
          resolve();
        });
      }).catch(error => {
        console.error('Error creating reception team:', error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocorreu um erro ao cadastrar nova equipe de recepção"
        });
        reject(error);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, preencha todos os campos."
      });
      reject(new Error('Invalid input'));
    }
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





  async findVisitorByCult(cultId: string): Promise<Visitor[]> {
    try {
      const collectionRef = this.firestore.collection('visitor');
      const querySnapshot = await collectionRef.get().toPromise();

      if (!querySnapshot) {
        console.error('Erro ao buscar documentos');
        return [];
      }

      if (querySnapshot.empty) {
        console.log('Nenhum documento encontrado');
        return [];
      }

      const documents: Visitor[] = [];
      querySnapshot.forEach(doc => {
          if ((doc.data() as Visitor).visitedCult == cultId) {
            console.log(doc.data() as Visitor);
            documents.push(doc.data() as Visitor);               
          }          
          console.log(documents);
      });
      console.log(documents);
      return documents;
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
      throw error;
    }
  }


  async findCultById(id: string): Promise<Cult | undefined> {
    try {
      const docRef = this.firestore.collection('cult').doc(id);
      const docSnapshot = await docRef.get().toPromise();
  
      if (docSnapshot && docSnapshot.exists) {
        console.log(docSnapshot.data() as Cult);
        
        return docSnapshot.data() as Cult;
      } else {
        console.log('Documento não encontrado');
        return undefined;
      }
    } catch (error) {
      console.error('Erro ao buscar documento:', error);
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
  recievVisit: String;
  visitedCult: string
}

type ReceptionTeam = {
  id: string;
  name: string;
  lead: string;
}
