import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { EbdControlService } from '../service/ebd-control.service';
import { Professor } from 'src/app/models/Professor';

@Component({
  selector: 'app-new-class',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './new-class.component.html',
  styleUrl: './new-class.component.scss'
})
export class NewClassComponent implements OnInit{

  newClassForm!: FormGroup
  professorList: Professor[] = [];

  constructor(private service: EbdControlService) { }

  ngOnInit(): void {
    this.findProfessor()
    this.newClassForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      professor: new FormControl('', [Validators.required])
    })
  }
  get name() {
    return this.newClassForm.get('name')!
  }
  get professor() {
    return this.newClassForm.get('professor')!
  }

  async findProfessor() {
    try {
      const documents = await this.service.findData();
      if (documents && documents.length > 0) {
        this.professorList = documents;
      } else {
        console.log('Nenhum documento encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
    }
  }

  registerClass(){
    this.service.createClass({
      id: "",
      name: this.name.value,
      professor: this.professor.value,
      qtdStudents: 0
    }).then(() => {
      this.name.reset();
      this.professor.reset();

    }).catch((error) => {
      console.error('Erro ao criar turma: ', error);
    });
  }
}
