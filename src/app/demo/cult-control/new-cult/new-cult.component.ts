import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AnnouncementService } from '../../announcement/service/announcement.service';
import { CultControlService } from '../service/cult-control.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-new-cult',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './new-cult.component.html',
  styleUrl: './new-cult.component.scss'
})
export class NewCultComponent implements OnInit{

  newCultForm!: FormGroup

  constructor(private service: CultControlService) { }

  ngOnInit(): void {
    this.newCultForm = new FormGroup({
      data: new FormControl('', [Validators.required]),
      pregador: new FormControl('', [Validators.required]),
      tema: new FormControl('', [Validators.required]),
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

  registerCult(){
    this.service.createData({
      data: this.data.value,
      pregador: this.pregador.value,
      tema: this.tema.value
    })
  }
}
