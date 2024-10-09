import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { EbdControlService } from '../service/ebd-control.service';
import { Classroom } from 'src/app/models/Classroom';
import { Card } from 'src/app/models/Card';

@Component({
  selector: 'app-classroom-details',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './classroom-details.component.html',
  styleUrl: './classroom-details.component.scss'
})
export class ClassroomDetailsComponent implements OnInit {

  id!: string;
  classroom: Classroom | undefined;
  cards: Card[] = [];

  constructor(private route: ActivatedRoute, private service: EbdControlService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    console.log('ID:', this.id);
    this.showDetails(this.id)
  }

  async showDetails(id: string) {
    try {
      const classroom = await this.service.findClassroomById(id);
      this.classroom = classroom;
      console.log(this.classroom);
     this.cards = [
        {
          background: 'bg-c-blue',
          title: 'Presentes',
          icon: 'icon-users',
          text: '',
          number: (this.classroom?.qtdPresentes ?? 0),
          no: ''
        },
        {
          background: 'bg-c-green',
          title: 'Biblias',
          icon: 'icon-users',
          text: '',
          number: (this.classroom?.qtdBible ?? 0),
          no: ''
        },
        {
          background: 'bg-c-yellow',
          title: 'Livro/Revistas',
          icon: 'icon-users',
          text: '',
          number: (this.classroom?.qtdMaterials ?? 0),
          no: ''
        }
      ];
    } catch (error) {
      console.error('Erro ao buscar documento:', error);
    }    
  }
}
