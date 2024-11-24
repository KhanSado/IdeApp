import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CultControlService } from './service/cult-control.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // Importa Firestore no modo compat
import { Cult } from 'src/app/models/Cult';

@Component({
  selector: 'app-cult-control',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule, DatePipe],
  templateUrl: './cult-control.component.html',
  styleUrls: ['./cult-control.component.scss'], // Corrigido o nome do estilo
})
export class CultControlComponent implements OnInit {
  cults: Cult[] = []; // Cultos carregados para a página atual
  totalDocuments = 0; // Total de documentos na coleção
  totalPages = 0; // Total de páginas
  currentPage = 1; // Página atual
  limit = 5; // Itens por página
  lastVisible: firebase.firestore.DocumentSnapshot | null = null; // Último documento visível
  previousPages: firebase.firestore.DocumentSnapshot[] = []; // Rastreamento de páginas anteriores
  hasMoreCults = true; // Controle do botão "Próxima Página"
  startDate: Date | null = null;
  endDate: Date | null = null;
  newCultForm!: FormGroup; // Para uso futuro, caso precise de um formulário
  cult: Cult | undefined; // Detalhes do culto selecionado (opcional)

  constructor(private service: CultControlService, private router: Router) {}

  async ngOnInit(): Promise<void> { 
    await this.calculateTotalPages(); // Calcula o total de páginas
    this.lastVisible = null; // Garante que a primeira página será carregada
    this.previousPages = []; // Reinicia as páginas anteriores
    await this.loadData('previous'); // Carrega os cultos da primeira página
  }

  // Calcula o total de páginas baseado no número total de documentos
  async calculateTotalPages(): Promise<void> {
    try {
      this.totalDocuments = await this.service.getTotalDocumentsCount();
      this.totalPages = Math.ceil(this.totalDocuments / this.limit);
    } catch (error) {
      console.error('Erro ao calcular total de páginas:', error);
    }
  }

  // Carrega os cultos da página atual, com navegação
  async loadData(direction: 'next' | 'previous' = 'next'): Promise<void> {
    try {
      const { paginatedCult, updatedPreviousPages } = await this.service.findDataWithPagination(
        this.limit,
        this.lastVisible,
        direction,
        this.previousPages
      );
  
      this.cults = paginatedCult.documents;
      this.lastVisible = paginatedCult.lastVisible;
      this.previousPages = updatedPreviousPages;
  
      // Atualiza o número da página atual
      if (direction === 'next' && this.currentPage < this.totalPages) {
        this.currentPage++;
      } else if (direction === 'previous' && this.currentPage > 1) {
        this.currentPage--;
      }
  
      // Define se há mais cultos a carregar
      this.hasMoreCults = this.currentPage < this.totalPages;
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  }
  

  // Navega para uma página específica
  async goToPage(page: number): Promise<void> {
    if (page >= 1 && page <= this.totalPages) {
      // Resetar lastVisible e páginas anteriores se navegar diretamente
      this.currentPage = page;
      
      // Atualizar o lastVisible e previousPages com base na página desejada
      const pageIndex = page - 1;
      if (pageIndex < this.previousPages.length) {
        this.lastVisible = this.previousPages[pageIndex];
        this.previousPages = this.previousPages.slice(0, pageIndex); // Manter as páginas anteriores até a página selecionada
      } else {
        this.lastVisible = null;
        this.previousPages = [];
      }
  
      // Carregar os cultos da nova página
      await this.loadData();
    }
  }
  

  // Método para deletar um culto
  deleteCult(docId: string): void {
    this.service
      .deleteCult(docId)
      .then(() => {
        console.log('Culto excluído com sucesso!');
        this.loadData(); // Atualiza a lista após exclusão
      })
      .catch((error) => {
        console.error('Erro ao excluir culto:', error);
      });
  }

  // Método para exibir detalhes de um culto
  async showDetails(id: string): Promise<void> {
    try {
      this.router.navigate(['/cult-control/cult-details/', id]);
    } catch (error) {
      console.error('Erro ao redirecionar para os detalhes:', error);
    }
  }

  // Método auxiliar para criar um array para exibição de páginas
  getPaginationArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  async searchByDate(): Promise<void> {
    if (this.startDate && this.endDate) {
      await this.loadDataByDate(this.startDate, this.endDate);
    } else {
      alert('Por favor, selecione ambas as datas.');
    }
  }

  async loadDataByDate(startDate: Date, endDate: Date): Promise<void> {
    try {
      // Obtenha os dados de paginacão
      const { documents, lastVisible }: PaginatedCult = await this.service.findDataByDate(startDate, endDate);
      
      // Atribua os documentos e o último documento visível
      this.cults = documents;
      this.lastVisible = lastVisible;
      
      // Aqui você pode adicionar uma lógica para as páginas anteriores, se necessário.
      // Caso precise de alguma funcionalidade de 'updatedPreviousPages', talvez seja necessário
      // calcular ou definir de outro jeito.
  
      this.hasMoreCults = this.cults.length > 0;  // Verifica se há cultos encontrados
    } catch (error) {
      console.error('Erro ao buscar cultos por data:', error);
    }
  }
}

interface PaginatedCult {
  documents: any[];  // O tipo exato dos documentos
  lastVisible: any;  // O tipo exato de lastVisible
}