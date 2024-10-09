import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { EbdControlService } from '../service/ebd-control.service';
import { Class } from 'src/app/models/Class';
import { Student } from 'src/app/models/Student';

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

  constructor(private service: EbdControlService) { }

  ngOnInit(): void {
    this.findClass()
    this.newClassroomForm = new FormGroup({
      data: new FormControl('', [Validators.required]),
      class: new FormControl('', [Validators.required]),
      offer: new FormControl('', [Validators.required]),
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
  get offer() {
    return this.newClassroomForm.get('offer')!
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
    const qtdPresentes = this.studentList.filter(student => student.present).length;
    const qtdBible = this.studentList.filter(student => student.bible).length;
    const qtdMaterial = this.studentList.filter(student => student.material).length;

    this.service.createClassroom({
      id: "",
      data: this.data.value,
      class: this.class.value,
      qtdPresentes: qtdPresentes,
      qtdBible: qtdBible,
      qtdMaterials: qtdMaterial,
      offer: this.offer.value
    }).then(() => {
      this.data.reset();
      this.class.reset();
      this.qtdPresentes.reset();
      this.offer.reset();
      this.studentList.forEach(student => student.present = false);
      this.studentList.forEach(student => student.bible = false);
      this.studentList.forEach(student => student.material = false);
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
