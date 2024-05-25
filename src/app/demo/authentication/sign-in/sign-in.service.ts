import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  user$!: Observable<any>;
  nome: string | null = null;


  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.auth.authState;
   }

   getUserId(): Promise<string | null> {
    return this.auth.currentUser.then(user => user ? user.uid : null);
  }

  signin(params: SignIn): Observable<any>{
      return from(
        this.auth.signInWithEmailAndPassword(
          params.email, params.password
        )
      )
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
     userId: params.userId
   });
 }

 findData(): Promise<string | null> {
  return this.getUserId().then(uid => {
    console.log(uid);

    if (uid) {
      return this.firestore.collection('users', ref => ref.where('userId', '==', uid)).get().toPromise().then(querySnapshot => {
        if (querySnapshot && !querySnapshot.empty) {
          querySnapshot.forEach(doc => {
            const data = doc.data() as SignUp;
            if (data) {
              this.nome = data.name;
            }
          });
          return this.nome;
        } else {
          console.log('Documento não encontrado');
          return null;
        }
      });
    } else {
      console.log('Usuário não está logado');
      return null;
    }
  }).catch(error => {
    console.error('Erro ao obter UID do usuário:', error);
    return null;
  });
}

}

type SignIn = {
  email: string;
  password: string;
}

type SignUp = {
  name: string;
  email: string;
  password: string;
  userId: string
}
