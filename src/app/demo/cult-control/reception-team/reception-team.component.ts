import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CultControlService } from '../service/cult-control.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-reception-team',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './reception-team.component.html',
  styleUrl: './reception-team.component.scss'
})
export class ReceptionTeamComponent implements OnInit{

  newReceptionTeamForm!: FormGroup

  constructor(private service: CultControlService) { }

  ngOnInit(): void {
    this.newReceptionTeamForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lead: new FormControl('', [Validators.required])
    })
  }
  get name() {
    return this.newReceptionTeamForm.get('name')!
  }
  get lead() {
    return this.newReceptionTeamForm.get('lead')!
  }

  registerReceptionTeam(){
    this.service.createReceptionTeam({
      id: "",
      name: this.name.value,
      lead: this.lead.value
    }).then(() => {
      // Limpar os campos após salvar
      this.name.reset();
      this.lead.reset();
    }).catch((error) => {
      console.error('Erro ao criar equipe de recepção: ', error);
    });
  }
}

