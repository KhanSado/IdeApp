import { SignInService } from '../service/sign-in.service';
// angular import
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export default class SignInComponent implements OnInit{

  loginForm!: FormGroup

  constructor(
    private signInService: SignInService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  get email() {
    return this.loginForm.get('email')!
  }
  get password() {
    return this.loginForm.get('password')!
  }

  login(){
    this.signInService.signin({
      email: this.email.value,
      password: this.password.value
    }).subscribe((res) => {
      sessionStorage.setItem("token", res.user._delegate.accessToken)
      this.router.navigate(['/home']);
    }, (err: any) => {
      sessionStorage.clear()
      console.log(err);
    })
  }

}
