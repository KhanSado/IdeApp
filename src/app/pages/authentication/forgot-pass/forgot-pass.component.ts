import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SignInService } from '../service/sign-in.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-pass',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './forgot-pass.component.html',
  styleUrl: './forgot-pass.component.scss'
})
export class ForgotPassComponent implements OnInit{

  recoveryPassForm!: FormGroup

  constructor(
    private signInService: SignInService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.recoveryPassForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
    })
  }

  get email() {
    return this.recoveryPassForm.get('email')!
  }

  async recoveryPass() {
    const email = this.recoveryPassForm.get('email')?.value;
    try {
      await this.signInService.resetPassword(email);
      Swal.fire({
        icon: 'success',
        title: 'Email Enviado!',
        text: 'O email de recuperação foi enviado. Verifique sua caixa de entrada.',
        confirmButtonColor: '#3085d6',
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao enviar email de recuperação. Tente novamente.',
        confirmButtonColor: '#d33',
      });
    }
  }
  

}
