import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Cult } from 'src/app/models/Cult';

@Injectable({
  providedIn: 'root'
})
export class HomeService implements OnInit{

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  async countCultsByYear(year: number): Promise<number> {
    try {
      // Filtra os cultos pelo ano
      const collectionRef = this.firestore.collection('cult', ref =>
        ref.where('data', '>=', `${year}-01-01`)
           .where('data', '<', `${year + 1}-01-01`)
           .orderBy('data')
      );
      const querySnapshot = await collectionRef.get().toPromise();
      
      if (!querySnapshot) {
        console.error('Erro ao buscar documentos');
        return 0;
      }

      return querySnapshot.size; // Retorna o número de cultos encontrados
    } catch (error) {
      console.error('Erro ao contar cultos:', error);
      throw error;
    }
  }
  
  getTotalPresencasNoAno(currentYear: number): Observable<{ totalAdultos: number, totalCriancasAdolescentes: number, totalVisitas: number }> {
    const cultosRef = this.firestore.collection('cult', ref =>
      ref.where('data', '>=', `${currentYear}-01-01`) // Início do ano
         .where('data', '<', `${currentYear + 1}-01-01`) // Fim do ano
    );

    return cultosRef.snapshotChanges().pipe(
      map(actions => {
        let totalAdultos = 0;
        let totalCriancasAdolescentes = 0;
        let totalVisitas = 0;

        actions.forEach(action => {
          const cultoData = action.payload.doc.data() as Cult; 
          
          totalAdultos += cultoData.qtdAdultos || 0; 
          totalCriancasAdolescentes += cultoData.qtdCriancasAdolescentes || 0; 
          totalVisitas += cultoData.qtdVisitas || 0;  
        });

        return { totalAdultos, totalCriancasAdolescentes, totalVisitas };
      })
    );
  }
  
}
