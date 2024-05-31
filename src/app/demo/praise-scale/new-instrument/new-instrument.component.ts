import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CultControlService } from '../../cult-control/service/cult-control.service';
import { PraiseScaleService } from '../praise-scale.service';

@Component({
  selector: 'app-new-instrument',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './new-instrument.component.html',
  styleUrl: './new-instrument.component.scss'
})
export class NewInstrumentComponent implements OnInit{

  newInstrumentForm!: FormGroup

  constructor(private service: PraiseScaleService) { }

  ngOnInit(): void {
    this.newInstrumentForm = new FormGroup({
      instrumentName: new FormControl('', [Validators.required]),
    })
  }
  get instrumentName() {
    return this.newInstrumentForm.get('instrumentName')!
  }

  registerInstrument(){
    this.service.createInstrument({
      id: "",
      instrumentName: this.instrumentName.value,
    }).then(() => {
      this.instrumentName.reset();
    }).catch((error) => {
      console.error('Erro ao criar instrumento: ', error);
    });
  }
}

