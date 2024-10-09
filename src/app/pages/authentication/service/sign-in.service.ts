import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { SignIn } from 'src/app/models/UserSignIn';
import { SignUp } from 'src/app/models/UserSignUp';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SignInService{

  user$!: Observable<any>;
  nome: string | undefined;


  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.auth.authState;
   }

   private getUserId(): Promise<string | null> {
    return this.auth.currentUser.then(user => user ? user.uid : null);
  }
  signin(params: SignIn): Observable<any> {
    return from(
      this.auth.signInWithEmailAndPassword(params.email, params.password)
        .then(userCredential => {
          return userCredential;
        })
        .catch(error => {
          if (error == "FirebaseError: Firebase: The supplied auth credential is incorrect, malformed or has expired. (auth/invalid-credential).") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Email ou senha incorreto, verifique suas credênciais e tente novamente ou contate um administrador do sistema"
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Um erro ocorreu, verifique suas credênciais e tente novamente !"
            });
          }
          return { error };
        })
    );
  }

  signup(params:SignUp): Observable<any>{
    return from(
      this.auth.createUserWithEmailAndPassword(
        params.email, params.password
      )
    )
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/auth/signin']);
  }

  createData(params:SignUp){
    this.firestore.collection('users').add({
     name: params.name,
     email: params.email,
     userId: params.userId,
     role: "",
   }).then(userRef => {
    const userId = userRef.id;
    this.firestore.doc(`users/${userId}`).update ({
      id: userId
    })
  })
  .catch(error => {
    console.error('Error creating visitor:', error);
  });
 }

 async findData(): Promise<string | null> {
  try {
    const uid = await this.getUserId();
    if (uid) {
      const querySnapshot = await this.firestore.collection('users', ref => ref.where('userId', '==', uid)).get().toPromise();
      if (querySnapshot && !querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const data = userDoc.data() as SignUp;
        this.nome = data.name;
        return this.nome;
      } else {
        console.log('Documento não encontrado');
        return null;
      }
    } else {
      console.log('Usuário não está logado');
      return null;
    }
  } catch (error) {
    console.error('Erro ao obter UID do usuário:', error);
    return null;
  }
}
 
}
