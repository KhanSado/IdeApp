import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CultControlService } from '../service/cult-control.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-new-cult-visit',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './new-cult-visit.component.html',
  styleUrl: './new-cult-visit.component.scss'
})
export class NewCultVisitComponent implements OnInit{

  newVisitorForm!: FormGroup
  cultList: Cult[] = [];

  constructor(private service: CultControlService) { }

  ngOnInit(): void {
    this.findCult()
    this.newVisitorForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      visitedCult: new FormControl('', [Validators.required])
    })
  }
  get name() {
    return this.newVisitorForm.get('name')!
  }
  get phone() {
    return this.newVisitorForm.get('phone')!
  }
  get visitedCult() {
    return this.newVisitorForm.get('visitedCult')!
  }

  registerVisitor(){
    this.service.createVisitor({
      id: "",
      name: this.name.value,
      phone: this.phone.value,
      visitedCult: this.visitedCult.value
    })

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
}


type Cult = {
  data: Date;
  tema: string;
  pregador: string;
  qtdAdultos: number;
  qtdCriancasAdolescentes: number;
  qtdVisitas: number,
  reception: string
}
