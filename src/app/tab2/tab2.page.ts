import { Router } from '@angular/router';
import { DataPhotoService } from './../services/data-photo.service';
import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  range=0;
  judul:String;
  isi:String;
  tanggalTulis:String;
  isiDataColl : AngularFirestoreCollection<data>;
  constructor(public dataServ:DataPhotoService,afs : AngularFirestore,private router: Router) {
    this.isiDataColl = afs.collection('dataNotes');
  }
  TambahFoto(){
    this.dataServ.tambahFoto()
  }
  TambahNotes(){
    var tanggal = new Date().getDate()
    var bulan = new Date().getMonth()+1
    var tahun = new Date().getFullYear()
    var date = String(tanggal)+" "+String(bulan)+" "+String(tahun)
    var idDB = new Date().getTime()+String(tanggal)+String(bulan)+String(tahun)+this.judul
    alert(idDB)
    var temp = {
        id: idDB,
        judul : this.judul,
        isinotes : this.isi,
        nilai:this.range,
        tanggal:this.tanggalTulis,
        linkStorage:"sssss"
    }
    this.isiDataColl.doc(idDB).set(temp);
    alert("Tambah Notes Berhasil")
    this.router.navigate(['/tabs/tab1'])
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
