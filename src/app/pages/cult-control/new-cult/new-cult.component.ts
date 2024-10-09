import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CultControlService } from '../service/cult-control.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ReceptionTeam } from 'src/app/models/ReceptionTeam';

@Component({
  selector: 'app-new-cult',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './new-cult.component.html',
  styleUrl: './new-cult.component.scss'
})
export class NewCultComponent implements OnInit{

  newCultForm!: FormGroup
  receptionTeamList: ReceptionTeam[] = [];

  constructor(private service: CultControlService) { }

  ngOnInit(): void {
    this.finReceptionTeam()
    this.newCultForm = new FormGroup({
      data: new FormControl('', [Validators.required]),
      pregador: new FormControl('', [Validators.required]),
      tema: new FormControl('', [Validators.required]),
      qtdAdultos: new FormControl('', [Validators.required]),
      qtdCriancasAdolescentes: new FormControl('', [Validators.required]),
      receptionTeam: new FormControl('', [Validators.required]),
    })
  }
  get data() {
    return this.newCultForm.get('data')!
  }
  get pregador() {
    return this.newCultForm.get('pregador')!
  }
  get tema() {
    return this.newCultForm.get('tema')!
  }

  get qtdAdultos() {
    return this.newCultForm.get('qtdAdultos')!
  }
  get qtdCriancasAdolescentes() {
    return this.newCultForm.get('qtdCriancasAdolescentes')!
  }
  get receptionTeam() {
    return this.newCultForm.get('receptionTeam')!
  }

  async finReceptionTeam() {
    try {
      const documents = await this.service.findReceptionTeam();
      if (documents && documents.length > 0) {
        this.receptionTeamList = documents;
      } else {
        console.log('Nenhum documento encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
    }
  }

  registerCult(){
    this.service.createCult({
      id: "",
      data: this.data.value,
      pregador: this.pregador.value,
      tema: this.tema.value,
      qtdAdultos: this.qtdAdultos.value,
      qtdCriancasAdolescentes: this.qtdCriancasAdolescentes.value,
      qtdVisitas: 0,
      reception: this.receptionTeam.value
    }).then(() => {
      // Limpar os campos após salvar
      this.data.reset();
      this.pregador.reset();
      this.tema.reset();
      this.qtdAdultos.reset();
      this.qtdCriancasAdolescentes.reset();
      this.qtdAdultos.reset();
      this.receptionTeam.reset();

    }).catch((error) => {
      console.error('Erro ao criar Culto: ', error);
    });
  }
}
