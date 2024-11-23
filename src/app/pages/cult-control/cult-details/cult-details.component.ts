import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CultControlService } from '../service/cult-control.service';
import { Cult } from 'src/app/models/Cult';
import { Card } from 'src/app/models/Card';


@Component({
  selector: 'app-cult-details',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule, DatePipe],
  templateUrl: './cult-details.component.html',
  styleUrl: './cult-details.component.scss'
})
export class CultDetailsComponent implements OnInit {

  id!: string;
  cult: Cult | undefined;
  cards: Card[] = [];

  constructor(private route: ActivatedRoute, private service: CultControlService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.showDetails(this.id)
  }

  trackByCard(index: number, card: Card): string {
    return card.title; // ou outro identificador único
  }

  
  async showDetails(id: string) {
    try {
      const cult = await this.service.findCultById(id);
      this.cult = cult;
      console.log(this.cult);
     this.cards = [
        {
          background: 'bg-c-blue',
          title: 'Adultos',
          icon: 'icon-users',
          text: '',
          number: (this.cult?.qtdAdultos ?? 0),
          no: ''
        },
        {
          background: 'bg-c-green',
          title: 'Crianças e Adolescentes',
          icon: 'icon-users',
          text: '',
          number: (this.cult?.qtdCriancasAdolescentes ?? 0),
          no: ''
        },
        {
          background: 'bg-c-yellow',
          title: 'Visitas',
          icon: 'icon-users',
          text: '',
          number: (this.cult?.qtdVisitas ?? 0),
          no: ''
        },
        {
          background: 'bg-c-red',
          title: 'Publico Total',
          icon: 'icon-users',
          text: '',
          number: (this.cult?.qtdAdultos ?? 0) + (this.cult?.qtdCriancasAdolescentes ?? 0) + (this.cult?.qtdVisitas ?? 0),
          no: ''
        }
      ];
    } catch (error) {
      console.error('Erro ao buscar documento:', error);
    }    
  }
}
