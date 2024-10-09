import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from './service/announcement.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-announcement',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.scss'
})
export class AnnouncementComponent implements OnInit{

  professionAreas: string[] = [];
  announcementForm!: FormGroup


  constructor(private service: AnnouncementService) { }

  ngOnInit(): void {
    // this.getuser()
    this.getProfessionAreas();
    this.announcementForm = new FormGroup({
      companyName: new FormControl('', [Validators.required]),
      companyEmail: new FormControl('', [Validators.required]),
      companyPhone: new FormControl('', [Validators.required]),
      area: new FormControl('', [Validators.required])
    })
  }
  get companyName() {
    return this.announcementForm.get('companyName')!
  }
  get companyEmail() {
    return this.announcementForm.get('companyEmail')!
  }
  get companyPhone() {
    return this.announcementForm.get('companyPhone')!
  }
  get area() {
    return this.announcementForm.get('area')!
  }

  registerAnnouncement(){
    this.service.createData({
      companyEmail: this.companyEmail.value,
      companyName: this.companyName.value,
      companyPhone: this.companyPhone.value,
      area: this.area.value
    })
  }

  getuser(){
    // this.service.findData()
  }

  getProfessionAreas(): void {
    this.professionAreas = [
      'Beleza',
      'Desenvolvimento de Software',
      'Design',
      'Educação',
      'Entrega',
      'Imóveis',
      'Jurídico',
      'Loja',
      'Saúde',
      'Serviços Gerais',
      'Tradução'
  ];
  }


}
