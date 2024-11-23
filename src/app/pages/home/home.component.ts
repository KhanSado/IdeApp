import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { HomeService } from './service/home.service';
import { Component, OnInit } from '@angular/core';
import { Cult } from 'src/app/models/Cult';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  cults: Cult[] = [];
  currentYear: number = new Date().getFullYear();
  cultCount: number = 0;
  totalAdultos: number = 0;
  totalCriancasAdolescentes: number = 0;
  totalVisitas: number = 0;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.loadCultCountForYear(this.currentYear);

    this.homeService.getTotalPresencasNoAno(this.currentYear).subscribe(data => {
      this.totalAdultos = data.totalAdultos;
      this.totalCriancasAdolescentes = data.totalCriancasAdolescentes;
      this.totalVisitas = data.totalVisitas;
    });
  }

  async loadCultCountForYear(year: number): Promise<void> {
    try {
      this.cultCount = await this.homeService.countCultsByYear(year);

      if (this.cultCount === 0) {
        console.log(`Nenhum culto encontrado para o ano ${year}`);
      } else {
        console.log(`Quantidade de cultos encontrados para o ano ${year}: ${this.cultCount}`);
      }
    } catch (error) {
      console.error('Erro ao carregar a contagem de cultos:', error);
    }
  }
  

}
