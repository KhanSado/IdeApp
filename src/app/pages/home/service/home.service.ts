import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class HomeService implements OnInit{

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  createData(){
     this.firestore.collection('users').add({
      name: 'John Doe',
      email: 'johndoe@example.com'
    });
  }

  findData(){
    this.firestore.doc('users/123').get().subscribe((doc) => {
      if (doc.exists) {
        console.log('Documento encontrado:', doc.data());
      } else {
        console.log('Documento não encontrado');
      }
    });
  }

  editData(){
    this.firestore.doc('users/123').update({
      email: 'janedoe@example.com'
    });
  }

  deleteData(){
    this.firestore.doc('users/123').delete();
  }
}
