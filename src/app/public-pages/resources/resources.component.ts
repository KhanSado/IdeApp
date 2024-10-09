import { Component } from '@angular/core';
import { ResourcesServices } from './service/resources.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss'
})
export class ResourcesComponent {
  filePreviewSpecsUrl: string | null = null;
  filePreviewColorSimplesUrl: string | null = null;
  filePreviewPBSimplesUrl: string | null = null;
  filePreviewOfficeSimplesUrl: string | null = null;
  filePreviewSimplesWithoutLetterUrl: string | null = null;
  filePreviewSimplesWithoutLetterPBUrl: string | null = null;

  filePreviewUphLogoUrl: string | null = null;



  constructor(private fileDownloadService: ResourcesServices) {}

  ngOnInit() {
    this.setFileSpecsPreview();
    this.setFileColorSimplePreview();
    this.setFilePBSimplePreview();
    this.setFileOfficeSimplePreview();
    this.setFileWithoutLetterPBSimplePreview();
    this.setFileWithoutLetterSimplePreview();

    this.setFileLogoUphPreview();
  }

  setFileSpecsPreview(): void {
    const fileUrl = 'assets/Logo-Specs.svg'; // Caminho para o arquivo
    this.filePreviewSpecsUrl = fileUrl; // Definindo o caminho do arquivo para pré-visualização
  }

  setFileColorSimplePreview(): void {
    const fileUrl = '/assets/v3.1-approved.png'; // Caminho para o arquivo
    this.filePreviewColorSimplesUrl = fileUrl; // Definindo o caminho do arquivo para pré-visualização
  }

  setFilePBSimplePreview(): void {
    const fileUrl = '/assets/v3.1approved-pb.png'; // Caminho para o arquivo
    this.filePreviewPBSimplesUrl = fileUrl; // Definindo o caminho do arquivo para pré-visualização
  }
  setFileOfficeSimplePreview(): void {
    const fileUrl = '/assets/logotipo-v3.2-oficio.png'; // Caminho para o arquivo
    this.filePreviewOfficeSimplesUrl = fileUrl; // Definindo o caminho do arquivo para pré-visualização
  }
  setFileWithoutLetterSimplePreview(): void {
    const fileUrl = '/assets/v3.1-logo.png'; // Caminho para o arquivo
    this.filePreviewSimplesWithoutLetterUrl = fileUrl; // Definindo o caminho do arquivo para pré-visualização
  }
  setFileWithoutLetterPBSimplePreview(): void {
    const fileUrl = '/assets/v3.1-log-sem-letra-pb.png'; // Caminho para o arquivo
    this.filePreviewSimplesWithoutLetterPBUrl = fileUrl; // Definindo o caminho do arquivo para pré-visualização
  }

  setFileLogoUphPreview(): void {
    const fileUrl = '/assets/uph.png'; // Caminho para o arquivo
    this.filePreviewUphLogoUrl = fileUrl; // Definindo o caminho do arquivo para pré-visualização
  }

  isImageFileSpecs(): boolean {
    // Verifica se o arquivo é uma imagem (você pode adicionar mais tipos de imagem se necessário)
    return this.filePreviewSpecsUrl ? this.filePreviewSpecsUrl.match(/\.(jpeg|jpg|gif|png|svg)$/i) !== null : false;
  }
  isImageFileSimpleColor(): boolean {
    // Verifica se o arquivo é uma imagem (você pode adicionar mais tipos de imagem se necessário)
    return this.filePreviewColorSimplesUrl ? this.filePreviewColorSimplesUrl.match(/\.(jpeg|jpg|gif|png|svg)$/i) !== null : false;
  }
  isImageFileSimplePB(): boolean {
    // Verifica se o arquivo é uma imagem (você pode adicionar mais tipos de imagem se necessário)
    return this.filePreviewPBSimplesUrl ? this.filePreviewPBSimplesUrl.match(/\.(jpeg|jpg|gif|png|svg)$/i) !== null : false;
  }

  isImageFileSimpleOffice(): boolean {
    // Verifica se o arquivo é uma imagem (você pode adicionar mais tipos de imagem se necessário)
    return this.filePreviewOfficeSimplesUrl ? this.filePreviewOfficeSimplesUrl.match(/\.(jpeg|jpg|gif|png|svg)$/i) !== null : false;
  }

  isImageFileWithoutLetterPB(): boolean {
    // Verifica se o arquivo é uma imagem (você pode adicionar mais tipos de imagem se necessário)
    return this.filePreviewSimplesWithoutLetterPBUrl ? this.filePreviewSimplesWithoutLetterPBUrl.match(/\.(jpeg|jpg|gif|png|svg)$/i) !== null : false;
  }

  isImageFileWithoutLetter(): boolean {
    // Verifica se o arquivo é uma imagem (você pode adicionar mais tipos de imagem se necessário)
    return this.filePreviewSimplesWithoutLetterUrl ? this.filePreviewSimplesWithoutLetterUrl.match(/\.(jpeg|jpg|gif|png|svg)$/i) !== null : false;
  }

  isImageFileUphLogo(): boolean {
    // Verifica se o arquivo é uma imagem (você pode adicionar mais tipos de imagem se necessário)
    return this.filePreviewUphLogoUrl ? this.filePreviewUphLogoUrl.match(/\.(jpeg|jpg|gif|png|svg)$/i) !== null : false;
  }

  downloadFileSpecs(): void {
    const fileUrl = 'assets/Logo-Specs.svg'; // URL do arquivo
    this.fileDownloadService.downloadFile(fileUrl).subscribe((blob) => {
      const downloadURL = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'Logo-Specs.svg'; // Nome do arquivo ao baixar
      link.click();
    });
}

downloadFileColorSimple(): void {
  const fileUrl = '/assets/v3.1-approved.png'; // URL do arquivo
  this.fileDownloadService.downloadFile(fileUrl).subscribe((blob) => {
    const downloadURL = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadURL;
    link.download = 'v3.1-approved.png'; // Nome do arquivo ao baixar
    link.click();
  });
}

downloadFilePBSimple(): void {
  const fileUrl = '/assets/v3.1approved-pb.png'; // URL do arquivo
  this.fileDownloadService.downloadFile(fileUrl).subscribe((blob) => {
    const downloadURL = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadURL;
    link.download = 'v3.1approved-pb.png'; // Nome do arquivo ao baixar
    link.click();
  });
}

downloadFileOfficeSimple(): void {
  const fileUrl = '/assets/logotipo-v3.2-oficio.png'; // URL do arquivo
  this.fileDownloadService.downloadFile(fileUrl).subscribe((blob) => {
    const downloadURL = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadURL;
    link.download = 'logotipo-v3.2-oficio.png'; // Nome do arquivo ao baixar
    link.click();
  });
}

downloadFileWithoutLetterPb(): void {
  const fileUrl = '/assets/v3.1-log-sem-letra-pb.png'; // URL do arquivo
  this.fileDownloadService.downloadFile(fileUrl).subscribe((blob) => {
    const downloadURL = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadURL;
    link.download = 'v3.1-log-sem-letra-pb.png'; // Nome do arquivo ao baixar
    link.click();
  });
}

downloadFileWithoutLetter(): void {
  const fileUrl = '/assets/v3.1-logo.png'; // URL do arquivo
  this.fileDownloadService.downloadFile(fileUrl).subscribe((blob) => {
    const downloadURL = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadURL;
    link.download = 'v3.1-logo.png'; // Nome do arquivo ao baixar
    link.click();
  });
}

downloadFileLogoUph(): void {
  const fileUrl = '/assets/uph.png'; // URL do arquivo
  this.fileDownloadService.downloadFile(fileUrl).subscribe((blob) => {
    const downloadURL = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadURL;
    link.download = 'uph.png'; // Nome do arquivo ao baixar
    link.click();
  });
}


}