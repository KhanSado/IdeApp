import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ElectionService } from '../service/elections.service';
import { Election } from 'src/app/models/Election';
import { Society } from 'src/app/models/Society';

@Component({
  selector: 'app-new-election',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './new-election.component.html',
  styleUrl: './new-election.component.scss'
})
export class NewElectionComponent implements OnInit{

  newElectionForm!: FormGroup
  societyList: Society[] = [];

  constructor(private service: ElectionService) { 

  }

  ngOnInit(): void {
    this.findSociety()

    this.newElectionForm = new FormGroup({
      society: new FormControl('', [Validators.required]),
      elegibles: new FormControl('', [Validators.required])
    })
  }

  get society() {
    return this.newElectionForm.get('society')!
  }

  get elegibles() {
    return this.newElectionForm.get('elegibles')
  }


 registerElection() {
  const elegiblesArray = this.elegibles?.value.toString().split(',').map((item: string) => item.trim());

  try {
   this.service.createNewElection({
      id: "",
      society: this.society.value
    }, elegiblesArray);  

    this.society.reset();  
  } catch (error) {
    console.error('Erro ao criar membro: ', error);
  }
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
}
  function registerElection() {
    throw new Error('Function not implemented.');
  }

  function findSociety() {
    throw new Error('Function not implemented.');
  }

