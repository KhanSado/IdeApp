import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // Importa Firestore corretamente no modo compat
import { UphService } from '../services/uph.service';
import { Minute } from 'src/app/models/Minute';


@Component({
  selector: 'app-list-minutes-uph',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './list-minutes-uph.component.html',
  styleUrl: './list-minutes-uph.component.scss'
})
export class ListMinutesUphComponent implements OnInit{

  lastVisible: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> | null = null;

  hasMoreCults: boolean = true; 

  minutes: Minute[] = [];
  minute: Minute | undefined;

  constructor(private service: UphService, private router: Router) { }

  ngOnInit(): void {
    this.findUphMinutes()
  }

  async findUphMinutes(limit: number = 5) {
    try {
      // Chama o serviço para buscar os cultos com paginação
      const { documents, lastVisible } = await this.service.findMinutesHph(this.lastVisible, limit);

      if (documents && documents.length > 0) {
        this.minutes = [...this.minutes, ...documents]; // Adiciona os novos cultos à lista existente
        this.lastVisible = lastVisible; // Atualiza o último documento visível para paginação
        this.hasMoreCults = true; // Existem mais cultos
      } else {
        console.log('Nenhum documento encontrado');
        this.hasMoreCults = false; // Não há mais cultos para carregar
      }
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
    }
  }

  async loadMoreMinutes(limit: number) {
    try {
      if (this.lastVisible) {
        await this.findUphMinutes(limit);
      }
    } catch (error) {
      console.error('Erro ao carregar mais cultos:', error);
    }
  }

  async showDetails(id: string) {
    try {
      this.router.navigate(['/minute/uph/minute-details/', id]);
    } catch (error) {
      console.error('Erro ao buscar documento:', error);
    }    
  }
}
