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


type Visitor = {
  id: string;
  name: string;
  phone: string;
  visitedCult: string
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CultControlService } from '../service/cult-control.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-visitor',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.scss']
})
export class VisitorComponent implements OnInit {

  searchVisitorForm!: FormGroup; // Reactive form with validation
  visitorList: Visitor[] = [];
  cultList: Cult[] = [];

  constructor(private service: CultControlService) {}

  ngOnInit(): void {
    this.findCult();
    this.searchVisitorForm = new FormGroup({
      visitedCult: new FormControl('', [Validators.required]) // Required field
    });
  }

  get visitedCult() {
    return this.searchVisitorForm.get('visitedCult')!;
  }

  async findCult() {
    try {
      const documents = await this.service.findData();
      if (documents && documents.length > 0) {
        this.cultList = documents;
      } else {
        console.log('Nenhum documento encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
    }
  }

  async searchVisitorsByCult() {
    if (this.visitedCult.invalid) {
      console.error('Culto precisa ser selecionado');
      return; // Prevent search if cult is not selected
    }

    const cultId = this.visitedCult.value; // Get the selected cult ID

    try {
      const documents = await this.service.findVisitorByCult(cultId);
      if (documents && documents.length > 0) {
        this.visitorList = []; 
        this.visitorList = documents
  
        console.log("DOCUMENTOS   " + this.visitorList); // Log 
        
      } else {
        this.visitorList = []; 
        console.log('Nenhum documento encontrado');
      }
    } catch (error) {
      this.visitorList = []; 
      console.error('Erro ao buscar documentos:', error);
    }
  }
}
