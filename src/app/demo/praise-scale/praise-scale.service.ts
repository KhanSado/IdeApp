import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
        name: params.instrumentName,
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

}

type Instrument = {
  id: string;
  instrumentName: string;
}
