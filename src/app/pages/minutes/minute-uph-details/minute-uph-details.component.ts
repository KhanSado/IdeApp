import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Card } from 'src/app/models/Card';
import { Minute } from 'src/app/models/Minute';
import { UphService } from '../services/uph.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-minute-uph-details',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './minute-uph-details.component.html',
  styleUrl: './minute-uph-details.component.scss'
})
export class MinuteUphDetailsComponent implements OnInit {

  id!: string;
  minute: Minute | undefined;
  cards: Card[] = [];

  constructor(private route: ActivatedRoute, private service: UphService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.showDetails(this.id)
  }

  async showDetails(id: string) {
    try {
      const minute = await this.service.findMinuteById(id);
      this.minute = minute;
      console.log(this.minute);
    
    } catch (error) {
      console.error('Erro ao buscar documento:', error);
    }    
  }

  generatePDF() {
    const doc = new jsPDF();
    const content = document.getElementById('pdfContent')?.innerText;
  
    if (content) {
      const pageWidth = doc.internal.pageSize.getWidth(); 
      const margin = 18; 
      const maxLineWidth = pageWidth - margin * 2;
  
      const lines = doc.splitTextToSize(content, maxLineWidth);
  
      doc.text(lines, margin, 10);
  
      doc.save('Ata.pdf');
    } else {
      console.error('Elemento HTML não encontrado ou vazio');
    }
  }
  
}
