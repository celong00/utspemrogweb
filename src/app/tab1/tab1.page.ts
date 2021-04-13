import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DataPhotoService } from './../services/data-photo.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  urlImageStorage : string[] = [];
  urlName : string[] =[];
  
  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;
  constructor(private afStorage : AngularFireStorage,
    public fotoService : DataPhotoService,private router: Router,afs : AngularFirestore) {
      this.isiDataColl = afs.collection('dataNotes');
      //ambil data pake async
      this.isiData = this.isiDataColl.valueChanges();

  }
  goDetail(id:String,judul:String,isinotes:String,tanggal:String,nilai:number,linkStorage:String){
    this.router.navigate(['/tab-detail',id,judul,isinotes,tanggal,nilai,linkStorage])
  }

}

interface data{
  id:String,
  judul:String,
  isinotes:String,
  tanggal:String,
  nilai:number,
  linkStorage:String,
}

