import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CultControlService } from './service/cult-control.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-cult-control',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './cult-control.component.html',
  styleUrl: './cult-control.component.scss'
})
export class CultControlComponent implements OnInit{

  newCultForm!: FormGroup
  cults: Cult[] = [];
  cult: Cult | undefined;

  constructor(private service: CultControlService, private router: Router) { }

  ngOnInit(): void {
    this.findCults()
  }

  async findCults() {
    try {
      const documents = await this.service.findData();
      if (documents && documents.length > 0) {
        this.cults = documents;
      } else {
        console.log('Nenhum documento encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
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
