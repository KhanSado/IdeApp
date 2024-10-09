import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Announcement } from 'src/app/models/Announcement';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService implements OnInit {

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  createData(params: Announcement){
     this.firestore.collection('announcement').add({
      area: params.area,
      companyName: params.companyName,
      companyPhone: params.companyPhone,
      companyEmail: params.companyEmail
    });
  }

  // findData(){
  //   console.log('find data');
  //   this.firestore.doc('/users/N3ydOWPKZiEB4FH4NxbP').get().subscribe((doc) => {
  //     if (doc.exists) {
  //       console.log('Documento encontrado:', doc.data());
  //     } else {
  //       console.log('Documento não encontrado');
  //     }
  //   });
  // }

  // editData(){
  //   this.firestore.doc('users/123').update({
  //     email: 'janedoe@example.com'
  //   });
  // }

  // deleteData(){
  //   this.firestore.doc('users/123').delete();
  // }
}

