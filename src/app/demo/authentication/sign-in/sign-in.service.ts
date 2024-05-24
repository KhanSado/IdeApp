import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) { }

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
     username: params.username,
     email: params.email
   });
 }

  get isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token;
  }

}

type SignIn = {
  email: string;
  password: string;
}

type SignUp = {
  username: string;
  email: string;
  password: string;
}
