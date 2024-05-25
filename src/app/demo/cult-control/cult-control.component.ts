import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CultControlService } from './service/cult-control.service';
import { DocumentData } from '@angular/fire/compat/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cult-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cult-control.component.html',
  styleUrl: './cult-control.component.scss'
})
export class CultControlComponent implements OnInit{

  newCultForm!: FormGroup
  cults: Cult[] = [];

  constructor(private service: CultControlService) { }

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
}

type Cult = {
  data: Date;
  tema: string;
  pregador: string;
}
