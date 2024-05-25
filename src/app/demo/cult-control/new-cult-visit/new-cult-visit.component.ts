import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CultControlService } from '../service/cult-control.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-new-cult-visit',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './new-cult-visit.component.html',
  styleUrl: './new-cult-visit.component.scss'
})
export class NewCultVisitComponent implements OnInit{

  newVisitorForm!: FormGroup

  constructor(private service: CultControlService) { }

  ngOnInit(): void {
    this.newVisitorForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    })
  }
  get name() {
    return this.newVisitorForm.get('name')!
  }
  get phone() {
    return this.newVisitorForm.get('phone')!
  }

  registerVisitor(){
    this.service.createVisitor({
      name: this.name.value,
      phone: this.phone.value
    })
  }
}


