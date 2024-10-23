import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Class } from 'src/app/models/Class';
import { Classroom } from 'src/app/models/Classroom';
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
}

