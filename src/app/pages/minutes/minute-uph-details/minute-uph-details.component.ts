import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Card } from 'src/app/models/Card';
import { Minute } from 'src/app/models/Minute';
import { UphService } from '../services/uph.service';
import jsPDF from 'jspdf';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-minute-uph-details',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './minute-uph-details.component.html',
  styleUrl: './minute-uph-details.component.scss',
  providers: [DatePipe]
})
export class MinuteUphDetailsComponent implements OnInit {

  id!: string;
  minute: Minute | undefined;
  cards: Card[] = [];
  formattedDate: string | null = null; // Adicione esta linha


  constructor(private route: ActivatedRoute, private service: UphService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.showDetails(this.id)
  }

  async showDetails(id: string) {
    try {
      const minute = await this.service.findMinuteById(id);
      this.minute = minute;
      if (this.minute && this.minute.data) { // Supondo que a data venha em `minute.date`
        this.formattedDate = this.datePipe.transform(this.minute.data, 'dd \'de\' MMMM \'de\' yyyy', 'pt-BR');
      }
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

  async generateDocx() {
    const content = document.getElementById('pdfContent')?.innerText;

    try {
      const response = await fetch('/assets/modelo.docx');
      const arrayBuffer = await response.arrayBuffer();

      const zip = new PizZip(arrayBuffer);
      const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

      console.log(content);
      
      doc.setData({ content: content });

      doc.render();

      const output = doc.getZip().generate({ type: 'blob' });
      saveAs(output, 'ata.docx');
    } catch (error) {
      console.error("Error generating DOCX: ", error);
    }
  }
  
}
