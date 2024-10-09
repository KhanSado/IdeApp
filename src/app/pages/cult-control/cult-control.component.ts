import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CultControlService } from './service/cult-control.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // Importa Firestore corretamente no modo compat
import { Cult } from 'src/app/models/Cult';


@Component({
  selector: 'app-cult-control',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './cult-control.component.html',
  styleUrl: './cult-control.component.scss'
})
export class CultControlComponent implements OnInit{

  lastVisible: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> | null = null;

  hasMoreCults: boolean = true; 


  newCultForm!: FormGroup
  cults: Cult[] = [];
  cult: Cult | undefined;

  constructor(private service: CultControlService, private router: Router) { }

  ngOnInit(): void {
    this.findCults()
  }

  async findCults(limit: number = 5) {
    try {
      // Chama o serviço para buscar os cultos com paginação
      const { documents, lastVisible } = await this.service.findData(this.lastVisible, limit);

      if (documents && documents.length > 0) {
        this.cults = [...this.cults, ...documents]; // Adiciona os novos cultos à lista existente
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

  async loadMoreCults(limit: number) {
    try {
      if (this.lastVisible) {
        await this.findCults(limit);
      }
    } catch (error) {
      console.error('Erro ao carregar mais cultos:', error);
    }
  }

  async showDetails(id: string) {
    try {
      this.router.navigate(['/cult-control/cult-details/', id]);
    } catch (error) {
      console.error('Erro ao buscar documento:', error);
    }    
  }
}
