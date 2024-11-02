import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Class } from 'src/app/models/Class';
import { Classroom } from 'src/app/models/Classroom';
import { Election } from 'src/app/models/Election';
import { Elegible } from 'src/app/models/Elegible';
import { Professor } from 'src/app/models/Professor';
import { Society } from 'src/app/models/Society';
import { Student } from 'src/app/models/Student';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ElectionService implements OnInit {

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

  addCandidatesToElections(docId: string, array: string[]) {
    const collectionRef = this.firestore.collection('election');
    const docRef = collectionRef.doc(docId);

    return docRef.set({ elegibles: array }, { merge: true });
  }

  async createElegible(params: Elegible): Promise<void> {
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
  
      if ((params.name.toString().length > 0)) {

        const elegibleRef = await this.firestore.collection('elegible-member').add({
          name: params.name,
          userId: userId,
          userDocId: userDocId 
        });
  
        await this.firestore.doc(`elegible-member/${elegibleRef.id}`).update({ id: elegibleRef.id });
  
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Novo Membro Elegivel adicionado",
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
      console.error('Error creating Membro Elegivel:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocorreu um erro ao cadastrar o Membro Elegivel"
      });
    }
  }

  async createSociety(params: Society): Promise<void> {
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
  
      if ((params.name.toString().length > 0)) {

        const societyRef = await this.firestore.collection('society').add({
          name: params.name,
          userId: userId,
          userDocId: userDocId 
        });
  
        await this.firestore.doc(`society/${societyRef.id}`).update({ id: societyRef.id });
  
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Novo Sociedade ou Ministerio adicionado",
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
      console.error('Error creating Sociedade ou Ministerio:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocorreu um erro ao cadastrar o Sociedade ou Ministerio"
      });
    }
  }

  async createNewElection(params: Election, elegibles: string[]): Promise<void> {
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
  
      if ((params.society.toString().length > 0)) {

        const electionRef = await this.firestore.collection('election').add({
          society: params.society,
          userId: userId,
          userDocId: userDocId 
        });
  
        await this.firestore.doc(`election/${electionRef.id}`).update({ id: electionRef.id });
  

        await this.addCandidatesToElections(electionRef.id, elegibles )

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Nova Eleição",
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
      console.error('Error creating Nova Eleição:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocorreu um erro ao cadastrar o Nova Eleição"
      });
    }
  }

  async findSociety(): Promise<Society[]> {
    try {
      const collectionRef = this.firestore.collection('society');
      const querySnapshot = await collectionRef.get().toPromise();

      if (!querySnapshot) {
        console.error('Erro ao buscar documentos');
        return [];
      }

      if (querySnapshot.empty) {
        console.log('Nenhum documento encontrado');
        return [];
      }

      const documents: Society[] = [];
      querySnapshot.forEach(doc => {        
        documents.push(doc.data() as Society);
      });
      
      return documents;
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
      throw error;
    }
  }







  //public 

  getElectionsBySociety(societyId: string): Promise<any[]> {
    return this.firestore.collection('election', ref => ref.where('society', '==', societyId))
      .get().toPromise()
      .then(snapshot => {
        if (!snapshot || snapshot.empty) {
          throw new Error('Nenhuma eleição encontrada para essa sociedade.');
        }
  
        // Mapeia todos os documentos encontrados para seus dados
        return snapshot.docs.map(doc => doc.data());
      })
      .catch(error => {
        console.error('Erro ao buscar eleições:', error);
        throw error;
      });
  }
  
  
  
  
}

