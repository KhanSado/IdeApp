import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Card } from 'src/app/models/Card';
import { Minute } from 'src/app/models/Minute';
import { UphService } from '../services/uph.service';

@Component({
  selector: 'app-minute-uph-details',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './minute-uph-details.component.html',
  styleUrl: './minute-uph-details.component.scss'
})
export class MinuteUphDetailsComponent implements OnInit {

  id!: string;
  minute: Minute | undefined;
  cards: Card[] = [];

  constructor(private route: ActivatedRoute, private service: UphService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    console.log('ID:', this.id);
    this.showDetails(this.id)
  }

  async showDetails(id: string) {
    try {
      const minute = await this.service.findMinuteById(id);
      this.minute = minute;
      console.log(this.minute);
    //  this.cards = [
    //     {
    //       background: 'bg-c-blue',
    //       title: 'Adultos',
    //       icon: 'icon-users',
    //       text: '',
    //       number: (this.minute?.qtdAdultos ?? 0),
    //       no: ''
    //     },
    //     {
    //       background: 'bg-c-green',
    //       title: 'Crianças e Adolescentes',
    //       icon: 'icon-users',
    //       text: '',
    //       number: (this.cult?.qtdCriancasAdolescentes ?? 0),
    //       no: ''
    //     },
    //     {
    //       background: 'bg-c-yellow',
    //       title: 'Visitas',
    //       icon: 'icon-users',
    //       text: '',
    //       number: (this.cult?.qtdVisitas ?? 0),
    //       no: ''
    //     },
    //     {
    //       background: 'bg-c-red',
    //       title: 'Publico Total',
    //       icon: 'icon-users',
    //       text: '',
    //       number: (this.cult?.qtdAdultos ?? 0) + (this.cult?.qtdCriancasAdolescentes ?? 0) + (this.cult?.qtdVisitas ?? 0),
    //       no: ''
    //     }
    //   ];
    } catch (error) {
      console.error('Erro ao buscar documento:', error);
    }    
  }
}
