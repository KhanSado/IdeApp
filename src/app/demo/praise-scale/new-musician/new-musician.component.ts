import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CultControlService } from '../../cult-control/service/cult-control.service';
import { PraiseScaleService } from '../praise-scale.service';

@Component({
  selector: 'app-new-musician',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './new-musician.component.html',
  styleUrl: './new-musician.component.scss'
})
export class NewMusicianComponent implements OnInit{

  newMusicianForm!: FormGroup
  instrumentList: Instrument[] = [];

  constructor(private service: PraiseScaleService) { }

  ngOnInit(): void {
    this.findInstruments()
    this.newMusicianForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      restrictions: new FormControl(''),
      instrument: new FormControl('', [Validators.required])
    })
  }
  get name() {
    return this.newMusicianForm.get('name')!
  }
  get restrictions() {
    return this.newMusicianForm.get('restrictions')!
  }
  get instrument() {
    return this.newMusicianForm.get('instrument')!
  }

  registerMusician(){
    this.service.createMusician({
      id: "",
      name: this.name.value,
      restrictions: this.restrictions.value,
      instrument: this.instrument.value
    }).then(() => {
      // Limpar os campos após salvar
      this.name.reset();
      this.restrictions.reset();
      this.instrument.reset();
    }).catch((error) => {
      console.error('Erro ao criar musico: ', error);
    });
  }

  async findInstruments() {
    try {
      const documents = await this.service.findInstruments();
      if (documents && documents.length > 0) {
        this.instrumentList = documents;
      } else {
        console.log('Nenhum documento encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
    }
  }
}

type Instrument = {
  id: string;
  instrumentName: string;
}
