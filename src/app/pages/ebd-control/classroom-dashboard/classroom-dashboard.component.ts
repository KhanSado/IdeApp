import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { EbdControlService } from '../service/ebd-control.service';
import { Class } from 'src/app/models/Class';
import { Classroom } from 'src/app/models/Classroom';

@Component({
  selector: 'app-classroom-dashboard',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './classroom-dashboard.component.html',
  styleUrl: './classroom-dashboard.component.scss'
})
export class ClassroomDashboardComponent implements OnInit {

  searchClassForm!: FormGroup;
  classroomList: Classroom[] = [];
  classList: Class[] = [];
  message: string | undefined;
  
  constructor(private service: EbdControlService, private router: Router) {}

  ngOnInit(): void {
    this.findClass()
    this.searchClassForm = new FormGroup({
      class: new FormControl('', [Validators.required])
    });
  }

  get class() {
    return this.searchClassForm.get('class')!;
  }

  async findClass() {
    try {
      const documents = await this.service.findClass();
      if (documents && documents.length > 0) {
        this.classList = documents;
        this.message = ""
      } else {
        this.message = "Nenhum documento encontrado"
        console.log('Nenhum documento encontrado');
      }
    } catch (error) {
      this.message = "Nenhum documento encontrado"
      console.error('Erro ao buscar documentos:', error);
    }
  }

  async searchClassroomByClass() {
    if (this.class.invalid) {
      console.error('Culto precisa ser selecionado');
      return; 
    }

    const classId = this.class.value;

    try {
      const documents = await this.service.findClassroomByClass(classId);
      if (documents && documents.length > 0) {
        this.classroomList = []; 
        this.classroomList = documents   
        this.message = ""  
           
      } else {
        this.classroomList = []; 
        this.message = "Nenhum documento encontrado"
        console.log('Nenhum documento encontrado');
      }
    } catch (error) {
      this.classroomList = []; 
      this.message = "Nenhum documento encontrado"
      console.error('Erro ao buscar documentos:', error);
    }
  }

  async showDetails(id: string) {
    try {
      this.router.navigate(['/ebd-control/classroom-details/', id]);
    } catch (error) {
      console.error('Erro ao buscar documento:', error);
    }    
  }
}
