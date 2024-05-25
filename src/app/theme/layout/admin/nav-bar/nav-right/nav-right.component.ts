import { OnInit } from '@angular/core';
// Angular Import
import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

// bootstrap
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { SignInService } from 'src/app/demo/authentication/sign-in/sign-in.service';
import { Router } from '@angular/router';

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
  name: string | null = null;

  // constructor
  constructor(
    private signInService: SignInService,
    private router: Router
  ) {
    this.visibleUserList = false;
  }
  ngOnInit(): void {
    this.getUser()
  }


  logout(){
    this.signInService.logout()
  }

  getUser() {
    this.signInService.findData()
    this.name = this.signInService.nome
  }
}
