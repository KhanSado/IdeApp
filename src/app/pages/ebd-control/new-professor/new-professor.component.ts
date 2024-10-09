import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { EbdControlService } from '../service/ebd-control.service';

@Component({
  selector: 'app-new-professor',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './new-professor.component.html',
  styleUrl: './new-professor.component.scss'
})
export class NewProfessorComponent implements OnInit{

  newProfessorForm!: FormGroup

  constructor(private service: EbdControlService) { }

  ngOnInit(): void {
    this.newProfessorForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    })
  }
  get name() {
    return this.newProfessorForm.get('name')!
  }

  registerProfessor(){
    this.service.createProfessor({
      id: "",
      name: this.name.value
    }).then(() => {
      this.name.reset();

    }).catch((error) => {
      console.error('Erro ao criar professor: ', error);
    });
  }
}
