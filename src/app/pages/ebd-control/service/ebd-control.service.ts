import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Class } from 'src/app/models/Class';
import { Classroom } from 'src/app/models/Classroom';
import { Professor } from 'src/app/models/Professor';
import { Student } from 'src/app/models/Student';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EbdControlService implements OnInit {

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

  async createProfessor(params: Professor): Promise<void> {
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

        const professorRef = await this.firestore.collection('professor').add({
          name: params.name,
          userId: userId,
          userDocId: userDocId 
        });
  
        await this.firestore.doc(`professor/${professorRef.id}`).update({ id: professorRef.id });
  
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Novo professor adicionado",
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
      console.error('Error creating professor:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocorreu um erro ao cadastrar o professor"
      });
    }
  }

  async findData(): Promise<Professor[]> {
    try {
      const collectionRef = this.firestore.collection('professor');
      const querySnapshot = await collectionRef.get().toPromise();

      if (!querySnapshot) {
        console.error('Erro ao buscar documentos');
        return [];
      }

      if (querySnapshot.empty) {
        console.log('Nenhum documento encontrado');
        return [];
      }

      const documents: Professor[] = [];
      querySnapshot.forEach(doc => {        
        documents.push(doc.data() as Professor);
      });
      
      return documents;
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
      throw error;
    }
  }

  async createClass(params: Class): Promise<void> {
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
  
      if (params.name.length > 0 && params.professor.length > 0) {
  
        const classRef = await this.firestore.collection('ebdClass').add({
          name: params.name,
          professor: params.professor,
          userId: userId,
          userDocId: userDocId
        });
  
        const classId = classRef.id;
  
        await this.firestore.doc(`ebdClass/${classId}`).update({
          id: classId
        });
  
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Nova turma adicionada",
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
      console.error('Error creating class:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocorreu um erro ao cadastrar nova class"
      });
    }
  }

  async findClass(): Promise<Class[]> {
    try {
      const collectionRef = this.firestore.collection('ebdClass');
      const querySnapshot = await collectionRef.get().toPromise();

      if (!querySnapshot) {
        console.error('Erro ao buscar documentos');
        return [];
      }

      if (querySnapshot.empty) {
        console.log('Nenhum documento encontrado');
        return [];
      }

      const documents: Class[] = [];
      querySnapshot.forEach(doc => {
        documents.push(doc.data() as Class);
      });

      return documents;
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
      throw error;
    }
  }

  async createClassroom(params: Classroom): Promise<void> {
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
        && (params.qtdPresentes.toString.length > 0)
        && (params.class.length > 0)) {

        const classroomRef = await this.firestore.collection('ebdClassroom').add({
          data: params.data,
          qtdPresentes: params.qtdPresentes,
          qtdBible: params.qtdBible,
          qtdMaterials: params.qtdMaterials,
          class: params.class,
          offer: params.offer,
          userId: userId,
          userDocId: userDocId 
        });
  
        await this.firestore.doc(`ebdClassroom/${classroomRef.id}`).update({ id: classroomRef.id });
  
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Nova aula adicionada",
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
      console.error('Error creating aula:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocorreu um erro ao cadastrar o aula"
      });
    }
  }

  async findClassroom(): Promise<Classroom[]> {
    try {
      const collectionRef = this.firestore.collection('ebdClassroom');
      const querySnapshot = await collectionRef.get().toPromise();

      if (!querySnapshot) {
        console.error('Erro ao buscar documentos');
        return [];
      }

      if (querySnapshot.empty) {
        console.log('Nenhum documento encontrado');
        return [];
      }

      const documents: Classroom[] = [];
      querySnapshot.forEach(doc => {
        documents.push(doc.data() as Classroom);
      });

      return documents;
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
      throw error;
    }
  }

  async findClassroomByClass(classId: string): Promise<Classroom[]> {
    try {
      const collectionRef = this.firestore.collection('ebdClassroom');
      const querySnapshot = await collectionRef.get().toPromise();

      if (!querySnapshot) {
        console.error('Erro ao buscar documentos');
        return [];
      }

      if (querySnapshot.empty) {
        console.log('Nenhum documento encontrado');
        return [];
      }

      const documents: Classroom[] = [];
      querySnapshot.forEach(doc => {
          if ((doc.data() as Classroom).class == classId) {
            console.log(doc.data() as Classroom);
            documents.push(doc.data() as Classroom);               
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

  async createStudent(params: Student): Promise<void> {    
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

      if ((params.name.length > 0)
        && (params.class.length > 0)) {
          
        const studentRef = await this.firestore.collection('ebdStudent').add({
          name: params.name,
          class: params.class,
          present: false,
          userId: userId,
          userDocId: userDocId 
        });
  
        await this.firestore.doc(`ebdStudent/${studentRef.id}`).update({ id: studentRef.id });

        await this.firestore.doc(`ebdClass/${params.class}`).update({
          qtdStudents: firebase.firestore.FieldValue.increment(1)
        });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Novo aluno adicionado",
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
      console.error('Error creating student:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocorreu um erro ao cadastrar aluno"
      });
    }
  }

  async findStudent(): Promise<Student[]> {
    try {
      const collectionRef = this.firestore.collection('ebdStudent');
      const querySnapshot = await collectionRef.get().toPromise();

      if (!querySnapshot) {
        console.error('Erro ao buscar documentos');
        return [];
      }

      if (querySnapshot.empty) {
        console.log('Nenhum documento encontrado');
        return [];
      }

      const documents: Student[] = [];
      querySnapshot.forEach(doc => {
        documents.push(doc.data() as Student);
      });

      return documents;
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
      throw error;
    }
  }

  async findStudentsByClass(classId: string): Promise<Student[]> {
    try {
      const collectionRef = this.firestore.collection('ebdStudent');
      const querySnapshot = await collectionRef.get().toPromise();

      if (!querySnapshot) {
        console.error('Erro ao buscar documentos');
        return [];
      }

      if (querySnapshot.empty) {
        console.log('Nenhum documento encontrado');
        return [];
      }

      const documents: Student[] = [];
      querySnapshot.forEach(doc => {
          if ((doc.data() as Student).class == classId) {
            console.log(doc.data() as Student);
            documents.push(doc.data() as Student);               
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

  async findClassroomById(id: string): Promise<Classroom | undefined> {
    try {
      const docRef = this.firestore.collection('ebdClassroom').doc(id);
      const docSnapshot = await docRef.get().toPromise();
  
      if (docSnapshot && docSnapshot.exists) {
        console.log(docSnapshot.data() as Classroom);
        
        return docSnapshot.data() as Classroom;
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

