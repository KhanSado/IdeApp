import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CultControlService } from '../service/cult-control.service';


@Component({
  selector: 'app-cult-details',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './cult-details.component.html',
  styleUrl: './cult-details.component.scss'
})
export class CultDetailsComponent implements OnInit {

  id!: string;
  cult: Cult | undefined;
  
  constructor(private route: ActivatedRoute, private service: CultControlService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    console.log('ID:', this.id);
  }

  async showDetails(id: string) {
    try {
      const cult = await this.service.findCultById(id);
      this.cult = cult;
      console.log(this.cult);
    } catch (error) {
      console.error('Erro ao buscar documento:', error);
    }    
  }
}

type Cult = {
  id: string;
  data: Date;
  tema: string;
  pregador: string;
  qtdAdultos: number;
  qtdCriancasAdolescentes: number;
  qtdVisitas: number,
  reception: string
}