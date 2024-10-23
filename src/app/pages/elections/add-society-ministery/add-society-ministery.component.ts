import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ElectionService } from '../service/elections.service';

@Component({
  selector: 'app-add-society-ministery',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './add-society-ministery.component.html',
  styleUrl: './add-society-ministery.component.scss'
})
export class AddSocietyMinisteryComponent implements OnInit{

  newSocietyForm!: FormGroup

  constructor(private service: ElectionService) { }

  ngOnInit(): void {
    this.newSocietyForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    })
  }
  get name() {
    return this.newSocietyForm.get('name')!
  }

  registerSociety(){
    this.service.createSociety({
      id: "",
      name: this.name.value
    }).then(() => {
      this.name.reset();

    }).catch((error) => {
      console.error('Erro ao criar membro: ', error);
    });
  }
}

