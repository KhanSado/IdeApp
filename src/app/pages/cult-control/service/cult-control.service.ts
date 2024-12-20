import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Cult } from 'src/app/models/Cult';
import { ReceptionTeam } from 'src/app/models/ReceptionTeam';
import { Visitor } from 'src/app/models/Visitor';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CultControlService implements OnInit {

  constructor(private firestore: AngularFirestore,  private auth: AngularFireAuth) { }

  ngOnInit(): void {}

  getCurrentUserId(): Promise<string | null> {
    return this.auth.currentUser.then(user => user ? user.uid : null);
  }
  
  async getUserDocumentId(userId: string): Promise<string> {
    try {
      const querySnapshot = await this.firestore.collection('users', ref => ref.where('userId', '==', userId)).get().toPromise();
      
      if (!querySnapshot || querySnapshot.empty) {
        throw new Error('User document not found');
      }
  
      const userDoc = querySnapshot.docs[0];
      return userDoc.id;
    } catch (error) {
      console.error('Error fetching user document:', error);
      throw new Error('Erro ao recuperar o documento do usuário');
    }
  }

  async createCult(params: Cult): Promise<void> {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Usuário não está autenticado."
        });
        throw new Error('Usuário não autenticado');
      }
  
      const userDocId = await this.getUserDocumentId(userId);
  
      if ((params.data.toString().length > 0)
        && (params.pregador.length > 0)
        && (params.qtdAdultos.toString().length > 0)
        && (params.qtdCriancasAdolescentes.toString().length > 0)
        && (params.reception.length > 0)
        && (params.tema.length > 0)) {

        const cultRef = await this.firestore.collection('cult').add({
          data: params.data,
          tema: params.tema,
          pregador: params.pregador,
          qtdAdultos: params.qtdAdultos,
          qtdCriancasAdolescentes: params.qtdCriancasAdolescentes,
          receptionTeam: params.reception,
          userId: userId,
          userDocId: userDocId 
        });
  
        await this.firestore.doc(`cult/${cultRef.id}`).update({ id: cultRef.id });
  
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Novo culto adicionado",
          showConfirmButton: true,
          confirmButtonText: "Ok",
          timer: 1500
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Por favor, preencha todos os campos."
        });
        throw new Error('Invalid input');
      }
    } catch (error) {
      console.error('Error creating cult:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocorreu um erro ao cadastrar o culto"
      });
    }
  }
  async createVisitor(params: Visitor): Promise<void> {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Usuário não está autenticado."
        });
        throw new Error('Usuário não autenticado');
      }
  
      const userDocId = await this.getUserDocumentId(userId);
  
      // Converte `name` para um array, separando por vírgulas e removendo espaços extras
      const namesArray = params.name.split(',').map(name => name.trim());
  
      if (namesArray.length > 0 && params.phone.length > 0 && params.visitedCult.length > 0) {
        
        const visitorRef = await this.firestore.collection('visitor').add({
          name: namesArray,
          phone: params.phone,
          recievVisit: params.recievVisit,
          visitedCult: params.visitedCult,
          userId: userId,
          userDocId: userDocId
        });
  
        const visitorId = visitorRef.id;
  
        await this.firestore.doc(`visitor/${visitorId}`).update({
          id: visitorId
        });
  

        await this.firestore.doc(`cult/${params.visitedCult}`).update({
          qtdVisitas: firebase.firestore.FieldValue.increment(namesArray.length)
        });
  
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Novo Visitante adicionado",
          showConfirmButton: true,
          confirmButtonText: "Ok",
          timer: 1500
        });
  
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Por favor, preencha todos os campos."
        });
        throw new Error('Invalid input');
      }
    } catch (error) {
      console.error('Error creating visitor:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocorreu um erro ao cadastrar novo visitante"
      });
    }
  }

  async createReceptionTeam(params: ReceptionTeam): Promise<void> {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Usuário não está autenticado."
        });
        throw new Error('Usuário não autenticado');
      }
  
      const userDocId = await this.getUserDocumentId(userId);
  
      if (params.name.length > 0 && params.lead.length > 0) {
  
        const receptionTeamRef = await this.firestore.collection('receptionTeam').add({
          name: params.name,
          lead: params.lead,
          userId: userId, 
          userDocId: userDocId
        });
  
        const receptionTeamId = receptionTeamRef.id;
  
        await this.firestore.doc(`receptionTeam/${receptionTeamId}`).update({
          id: receptionTeamId
        });
  
        console.log('Reception Team created with ID:', receptionTeamId);
  
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Nova equipe de recepção adicionada",
          showConfirmButton: true,
          confirmButtonText: "Ok",
          timer: 1500
        });
  
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Por favor, preencha todos os campos."
        });
        throw new Error('Invalid input');
      }
    } catch (error) {
      console.error('Error creating reception team:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocorreu um erro ao cadastrar nova equipe de recepção"
      });
    }
  }

  async findDataSimples(): Promise<Cult[]> {
    try {
      const collectionRef = this.firestore.collection('cult', ref => ref.orderBy('data', 'desc'));
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

  
  async findData(lastVisible: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> | null = null, limit: number=2): Promise<PaginatedCult> {
    try {
      let collectionRef = this.firestore.collection('cult', ref => ref.orderBy('data', 'desc').limit(limit));
  
      // Se houver um último documento visível, continuar a partir desse ponto
      if (lastVisible) {
        collectionRef = this.firestore.collection('cult', ref => ref
          .orderBy('data', 'desc')
          .startAfter(lastVisible)
          .limit(limit));
      }
  
      const querySnapshot = await collectionRef.get().toPromise();
  
      if (!querySnapshot) {
        console.error('Erro ao buscar documentos');
        return { documents: [], lastVisible: null };
      }
  
      if (querySnapshot.empty) {
        console.log('Nenhum documento encontrado');
        return { documents: [], lastVisible: null };
      }
  
      const documents: Cult[] = [];
      querySnapshot.forEach(doc => {
        documents.push(doc.data() as Cult);
      });
  
      const lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1] as firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
  
      return { documents, lastVisible: lastDocument };
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
      throw error;
    }
  }
  

  async getTotalDocumentsCount(): Promise<number> {
    try {
      const collectionRef = this.firestore.collection('cult');
      const querySnapshot = await collectionRef.get().toPromise();
      return querySnapshot?.size || 0; // Retorna o número total de documentos
    } catch (error) {
      console.error('Erro ao contar os documentos:', error);
      throw error;
    }
  }
  

  async findDataWithPagination(
    limit: number,
    lastVisible: firebase.firestore.DocumentSnapshot | null,
    direction: 'next' | 'previous',
    previousPages: firebase.firestore.DocumentSnapshot[] = []
  ): Promise<{ paginatedCult: PaginatedCult; updatedPreviousPages: firebase.firestore.DocumentSnapshot[] }> {
    try {
      let collectionRef = this.firestore.collection('cult', ref => ref.orderBy('data', 'desc').limit(limit));
      const updatedPreviousPages = [...previousPages];
  
      if (direction === 'next' && lastVisible) {
        updatedPreviousPages.push(lastVisible);
        collectionRef = this.firestore.collection('cult', ref =>
          ref.orderBy('data', 'desc').startAfter(lastVisible).limit(limit)
        );
      } else if (direction === 'previous' && updatedPreviousPages.length > 0) {
        const previousPage = updatedPreviousPages.pop();
        collectionRef = this.firestore.collection('cult', ref =>
          ref.orderBy('data', 'desc').endBefore(previousPage).limitToLast(limit)
        );
      }
  
      const querySnapshot = await collectionRef.get().toPromise();
      const documents: Cult[] = [];
      querySnapshot?.forEach(doc => documents.push(doc.data() as Cult));
  
      const newLastVisible = querySnapshot?.docs[querySnapshot.docs.length - 1] as firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> || null;
  
      return { 
        paginatedCult: { documents, lastVisible: newLastVisible }, 
        updatedPreviousPages 
      };
    } catch (error) {
      console.error('Erro ao buscar documentos com paginação:', error);
      throw error;
    }
  }
  




  async findReceptionTeam(): Promise<ReceptionTeam[]> {
    try {
      const collectionRef = this.firestore.collection('receptionTeam', ref => ref.orderBy('name', 'desc'));;
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

  async findDataByDate(startDate: Date, endDate: Date, limit: number = 2): Promise<PaginatedCult> {
    try {
      let collectionRef = this.firestore.collection('cult', ref => 
        ref.orderBy('data', 'desc')
           .where('data', '>=', startDate)  // Filtro para cultos após a data inicial
           .where('data', '<=', endDate)    // Filtro para cultos antes da data final
           .limit(limit)
      );
  
      const querySnapshot = await collectionRef.get().toPromise();
  
      if (!querySnapshot) {
        console.error('Erro ao buscar documentos');
        return { documents: [], lastVisible: null };
      }
  
      if (querySnapshot.empty) {
        console.log('Nenhum documento encontrado');
        return { documents: [], lastVisible: null };
      }
  
      const documents: Cult[] = [];
      querySnapshot.forEach(doc => {
        documents.push(doc.data() as Cult);
      });
  
      const lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1] as firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
  
      return { documents, lastVisible: lastDocument };
    } catch (error) {
      console.error('Erro ao buscar cultos por data:', error);
      throw error;
    }
  }
  

  async deleteCult(docId: string): Promise<void> {
    try {
      const result = await Swal.fire({
        title: "Tem certeza?",
        text: "Você não poderá reverter essa ação!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, excluir!"
      });
  
      if (result.isConfirmed) {
        await this.firestore.collection("cult").doc(docId).delete();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Culto excluído com sucesso",
          showConfirmButton: true,
          confirmButtonText: "Ok",
          timer: 1500
        });
     }
    } catch (error) {
      console.error('Erro ao excluir o Culto:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocorreu um erro ao excluir o culto"
      });
    }
  }
}

interface PaginatedCult {
  documents: Cult[];
  lastVisible: firebase.firestore.DocumentSnapshot | null;
}