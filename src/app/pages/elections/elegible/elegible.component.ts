import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ElectionService } from '../service/elections.service';

@Component({
  selector: 'app-elegible',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './elegible.component.html',
  styleUrl: './elegible.component.scss'
})
export class ElegibleComponent implements OnInit{

  newElegibleForm!: FormGroup

  constructor(private service: ElectionService) { }

  ngOnInit(): void {
    this.newElegibleForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    })
  }
  get name() {
    return this.newElegibleForm.get('name')!
  }

  registerElegible(){
    this.service.createElegible({
      id: "",
      name: this.name.value
    }).then(() => {
      this.name.reset();

    }).catch((error) => {
      console.error('Erro ao criar membro: ', error);
    });
  }
}

