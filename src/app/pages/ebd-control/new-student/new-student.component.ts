import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { EbdControlService } from '../service/ebd-control.service';
import { Class } from 'src/app/models/Class';

@Component({
  selector: 'app-new-student',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './new-student.component.html',
  styleUrl: './new-student.component.scss'
})
export class NewStudentComponent implements OnInit{

  newStudentForm!: FormGroup
  ClassList: Class[] = [];

  constructor(private service: EbdControlService) { }

  ngOnInit(): void {
    this.findClass()
    this.newStudentForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      class: new FormControl('', [Validators.required]),
    })
  }
  get name() {
    return this.newStudentForm.get('name')!
  }
  get class() {
    return this.newStudentForm.get('class')!
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

  registerStudent(){
    console.log(this.name.value);
    console.log(this.class.value);
    
    
    this.service.createStudent({
      id: "",
      name: this.name.value,
      class: this.class.value,
      present: false,
      bible: false,
      material: false
    }).then(() => {
      this.name.reset();
      this.class.reset();
    }).catch((error) => {
      console.error('Erro ao criar aluno: ', error);
    });
  }
}
