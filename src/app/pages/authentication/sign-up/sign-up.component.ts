// angular import
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { SignInService } from '../service/sign-in.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export default class SignUpComponent implements OnInit {

  signupForm!: FormGroup

  constructor(
    private signInService: SignInService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  get username() {
    return this.signupForm.get('username')!
  }
  get email() {
    return this.signupForm.get('email')!
  }
  get password() {
    return this.signupForm.get('password')!
  }

  registerUser(){
    this.signInService.signup({
      id: "",
      name: "",
      email: this.email.value,
      password: this.password.value,
      userId: "",
      rule: "",
    }).subscribe((res: any) => {
      sessionStorage.setItem("token", res.user._delegate.accessToken)
      this.router.navigate(['/home']);
      this.signInService.createData({
        id: "",
        name: this.username.value,
        email: this.email.value,
        password: "",
        userId: res.user._delegate.uid,
        rule: "",
      })

    }, (err: any) => {
        console.log(err);
    })
  }

}
