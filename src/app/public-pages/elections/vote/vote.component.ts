import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { async } from 'rxjs';
import { Society } from 'src/app/models/Society';
import { ElectionService } from 'src/app/pages/elections/service/elections.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-vote',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.scss'
})
export class VoteComponent implements OnInit{

  societyForm!: FormGroup

  elegibles: string[] = [];  
  societyList: Society[] = [];



  constructor(private service: ElectionService) { }

  ngOnInit(): void {
    this.showElegibles()
    this.findSociety()
    this.societyForm = new FormGroup({
      society: new FormControl('', [Validators.required]),
    })
  }

  get society() {
    return this.societyForm.get('society')!
  }

  async findSociety() {
    try {
      const documents = await this.service.findSociety();
      if (documents && documents.length > 0) {
        this.societyList = documents;
      } else {
        console.log('Nenhum documento encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
    }
  }


  async showElegibles() {
    try {
      console.log(this.society.value);
      
      const electionData = await this.service.getElectionBySociety(this.society.value);

      this.elegibles = electionData.elegibles || [];  
      console.log('Lista de Candidatos:', this.elegibles);

    } catch (error) {
      console.error('Erro ao buscar elegíveis:', error);
    }
  }
  
}