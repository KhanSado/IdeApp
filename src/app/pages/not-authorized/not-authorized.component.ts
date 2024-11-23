import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-not-authorized',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './not-authorized.component.html',
  styleUrl: './not-authorized.component.scss'
})
export class NotAuthorizedComponent {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/auth/signin']); // Substitua '/home' pela rota desejada
  }
}
