import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { UphService } from '../services/uph.service';
@Component({
  selector: 'app-minutes-uph',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './minutes-uph.component.html',
  styleUrl: './minutes-uph.component.scss'
})
export class MinutesUphComponent implements OnInit{
  
  newMinuteForm!: FormGroup

  constructor(private service: UphService) { }

  ngOnInit(): void {
    this.newMinuteForm = new FormGroup({
      data: new FormControl('', [Validators.required]),
      hour: new FormControl('', [Validators.required]),
      president: new FormControl('', [Validators.required]),
      local: new FormControl('', [Validators.required]),
      presents: new FormControl('', [Validators.required]),
      ausents: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      ataNumber: new FormControl('', [Validators.required]),
      finishHour: new FormControl('', [Validators.required]),
      secretary: new FormControl('', [Validators.required]),
      finishPray: new FormControl('', [Validators.required])
    })
  }

  get data() {
    return this.newMinuteForm.get('data')!
  }
  get hour() {
    return this.newMinuteForm.get('hour')!
  }
  get president() {
    return this.newMinuteForm.get('president')!
  }
  get local() {
    return this.newMinuteForm.get('local')!
  }
  get presents() {
    return this.newMinuteForm.get('presents')!
  }
  get ausents() {
    return this.newMinuteForm.get('ausents')!
  }
  get ataNumber() {
    return this.newMinuteForm.get('ataNumber')!
  }
  get finishHour() {
    return this.newMinuteForm.get('finishHour')!
  }
  get secretary() {
    return this.newMinuteForm.get('secretary')!
  }
  get content() {
    return this.newMinuteForm.get('content')!
  }
  get finishPray() {
    return this.newMinuteForm.get('finishPray')!
  }

  registerUphMinute(){
    this.service.createMinute({
      id: "",
      data: this.data.value,
      hour: this.hour.value,
      president: this.president.value,
      local: this.local.value,
      presents: this.presents.value,
      ausents: this.ausents.value,
      content: this.content.value,
      ataNumber: this.ataNumber.value,
      finishHour: this.finishHour.value,
      secretary: this.secretary.value,
      finishPray: this.finishPray.value
    }).then(() => {
      this.data.reset();
      this.hour.reset();
      this.president.reset();
      this.local.reset();
      this.content.reset();
      this.ataNumber.reset();
      this.finishHour.reset();
      this.finishPray.reset();
      this.secretary.reset();
    }).catch((error) => {
      console.error('Erro ao criar ata: ', error);
    });
  }
}
