import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { EbdControlService } from '../service/ebd-control.service';

@Component({
  selector: 'app-new-classroom',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './new-classroom.component.html',
  styleUrl: './new-classroom.component.scss'
})
export class NewClassroomComponent implements OnInit{

  newClassroomForm!: FormGroup
  ClassList: Class[] = [];
  studentList: Student[] = [];
  // cultList: Cult[] = [];

  constructor(private service: EbdControlService) { }

  ngOnInit(): void {
    this.findClass()
    this.newClassroomForm = new FormGroup({
      data: new FormControl('', [Validators.required]),
      class: new FormControl('', [Validators.required]),
      qtdPresentes: new FormControl('', [Validators.required])
    })
  }
  get data() {
    return this.newClassroomForm.get('data')!
  }
  get class() {
    return this.newClassroomForm.get('class')!
  }
  get qtdPresentes() {
    return this.newClassroomForm.get('qtdPresentes')!
  }

  async findClass() {
    try {
      const documents = await this.service.findClass();
      if (documents && documents.length > 0) {
        this.ClassList = documents;
      } else {
        console.log('Nenhum documento encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
    }
  }

  registerClassroom(){
    this.service.createClassroom({
      id: "",
      data: this.data.value,
      class: this.class.value,
      qtdPresentes: 0
    }).then(() => {
      // Limpar os campos após salvar
      this.data.reset();
      this.class.reset();
      this.qtdPresentes.reset();

    }).catch((error) => {
      console.error('Erro ao criar aula: ', error);
    });
  }

  async searchStudentByClass() {
    if (this.class.invalid) {
      console.error('turma precisa ser selecionada');
      return; 
    }

    const classiD = this.class.value;

    try {
      const documents = await this.service.findStudentsByClass(classiD);
      if (documents && documents.length > 0) {
        this.studentList = []; 
        this.studentList = documents        
      } else {
        this.studentList = []; 
        console.log('Nenhum documento encontrado');
      }
    } catch (error) {
      this.studentList = []; 
      console.error('Erro ao buscar documentos:', error);
    }
  }
}

type Class = {
  id: string;
  name: string,
  professor: string
}

type Student = {
  id: string,
  name: string,
  class: string
}