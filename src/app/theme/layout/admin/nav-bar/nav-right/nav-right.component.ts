import { OnInit } from '@angular/core';
// Angular Import
import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

// bootstrap
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { SignInService } from 'src/app/pages/authentication/service/sign-in.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SignUp } from 'src/app/models/UserSignUp';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [style({ transform: 'translateX(100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(100%)' }))])
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [style({ transform: 'translateX(-100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))])
    ])
  ]
})
export class NavRightComponent implements OnInit{
  // public props
  visibleUserList: boolean;
  friendId!: number;
  name: string | undefined;

  // constructor
  constructor(
    private signInService: SignInService,
    private router: Router,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.visibleUserList = false;
  }
  ngOnInit(): void {
    this.findData()
  }

  // Mock implementation of getUserId. Replace with actual implementation.
  private getUserId(): Promise<string | null> {
    return this.auth.currentUser.then(user => user ? user.uid : null);
  }

  logout(){
    this.signInService.logout()
  }

  async findData(): Promise<string | null> {
    try {
      const uid = await this.getUserId();
      if (uid) {
        const querySnapshot = await this.firestore.collection('users', ref => ref.where('userId', '==', uid)).get().toPromise();
        if (querySnapshot && !querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const data = userDoc.data() as SignUp;
          this.name = data.name;
          return this.name;
        } else {
          console.log('Documento não encontrado');
          this.logout()
          return null;
        }
      } else {        
        console.log('Usuário não está logado');
        // this.logout()
        return null;
      }
    } catch (error) {
      console.error('Erro ao obter UID do usuário:', error);
      this.logout()
      return null;
    }
  }
}
