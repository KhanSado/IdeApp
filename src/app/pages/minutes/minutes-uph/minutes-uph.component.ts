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
      content: new FormControl('', [Validators.required])
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
  get content() {
    return this.newMinuteForm.get('content')!
  }

  registerUphMinute(){
    this.service.createMinute({
      id: "",
      data: this.data.value,
      hour: this.hour.value,
      president: this.president.value,
      local: this.local.value,
      content: this.content.value,
      ataNumber: 0,
      finishHour: "",
      secretary: ""
    }).then(() => {
      this.data.reset();
      this.hour.reset();
      this.president.reset();
      this.local.reset();
      this.content.reset();
    }).catch((error) => {
      console.error('Erro ao criar ata: ', error);
    });
  }
}
