import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Minute } from 'src/app/models/Minute';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UphService implements OnInit {

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

  async createMinute(params: Minute): Promise<void> {
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
        && (params.hour.toString().length > 0)
        && (params.local.length > 0)
        && (params.president.length > 0)
        && (params.content.length > 0)) {

        const minuteRef = await this.firestore.collection('minutes-uph').add({
          data: params.data,
          hour: params.hour,
          local: params.local,
          president: params.president,
          content: params.content,
          presents: params.presents,
          ausents: params.ausents,
          ataNumber: params.ataNumber,
          finishHour: params.finishHour,
          secretary: params.secretary,
          finishPray: params.finishPray,
          userId: userId,
          userDocId: userDocId 
        });
  
        await this.firestore.doc(`minutes-uph/${minuteRef.id}`).update({ id: minuteRef.id });
  
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Nova ata adicionada",
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

  async findMinutesHph(lastVisible: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> | null = null, limit: number=2): Promise<PaginatedMinute> {
    try {
      let collectionRef = this.firestore.collection('minutes-uph', ref => ref.orderBy('data', 'desc').limit(limit));
  
      if (lastVisible) {
        collectionRef = this.firestore.collection('minutes-uph', ref => ref
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
  
      const documents: Minute[] = [];
      querySnapshot.forEach(doc => {
        documents.push(doc.data() as Minute);
      });
  
      // Pega o último documento para a próxima paginação
      const lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1] as firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
  
      return { documents, lastVisible: lastDocument };
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
      throw error;
    }
  }

  async findMinuteById(id: string): Promise<Minute | undefined> {
    try {
      const docRef = this.firestore.collection('minutes-uph').doc(id);
      const docSnapshot = await docRef.get().toPromise();
  
      if (docSnapshot && docSnapshot.exists) {
        console.log(docSnapshot.data() as Minute);
        
        return docSnapshot.data() as Minute;
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

interface PaginatedMinute {
  documents: Minute[];
  lastVisible: firebase.firestore.DocumentSnapshot | null;
}