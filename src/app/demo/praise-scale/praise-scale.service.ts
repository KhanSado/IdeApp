import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PraiseScaleService implements OnInit {

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  createInstrument(params: Instrument): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (params.instrumentName.length > 0) {
        this.firestore.collection('instrument').add({
          instrumentName: params.instrumentName,
        }).then(instrumentRef => {
          const instrumentId = instrumentRef.id;
          return this.firestore.doc(`instrument/${instrumentId}`).update({
            id: instrumentId
          }).then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Novo instrumento adicionado",
              showConfirmButton: true,
              confirmButtonText: "Ok",
              timer: 1500
            });
            resolve();
          });
        }).catch(error => {
          console.error('Error creating reception team:', error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ocorreu um erro ao cadastrar novo instrumento"
          });
          reject(error);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Por favor, preencha todos os campos."
        });
        reject(new Error('Invalid input'));
      }
    });
  }

  createMusician(params: Musician): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (params.name.length > 0 && params.instrument.length > 0 && params.restrictions.length > 0) {
        this.firestore.collection('musician').add({
          name: params.name,
          instrument: params.instrument,
          restrictions: params.restrictions,
        }).then(musicianRef => {
          const musicianId = musicianRef.id;
          return this.firestore.doc(`musician/${musicianId}`).update({
            id: musicianId
          }).then(() => {
            return this.firestore.doc(`instrument/${params.instrument}`).update({
              qtdMusicians: firebase.firestore.FieldValue.increment(1)
            });
          }).then(() => {  
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Novo Músico adicionado",
              showConfirmButton: true,
              confirmButtonText: "Ok",
              timer: 1500
            });
            resolve();
          });
        }).catch(error => {
          console.error('Error creating visitor:', error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ocorreu um erro ao cadastrar novo músico"
          });
          reject(error);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Por favor, preencha todos os campos."
        });
        reject(new Error('Invalid input'));
      }
    });
  }


  async findInstruments(): Promise<Instrument[]> {
    try {
      const collectionRef = this.firestore.collection('instrument');
      const querySnapshot = await collectionRef.get().toPromise();

      if (!querySnapshot) {
        console.error('Erro ao buscar documentos');
        return [];
      }

      if (querySnapshot.empty) {
        console.log('Nenhum documento encontrado');
        return [];
      }

      const documents: Instrument[] = [];
      querySnapshot.forEach(doc => {
        documents.push(doc.data() as Instrument);
      });

      return documents;
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
      throw error;
    }
  }


}

type Instrument = {
  id: string;
  instrumentName: string;
}

type Musician = {
  id: string;
  name: string;
  restrictions: String;
  instrument: string;
}