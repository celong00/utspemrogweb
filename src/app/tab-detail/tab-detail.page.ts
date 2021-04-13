import { DataPhotoService } from './../services/data-photo.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map} from 'rxjs/operators';
@Component({
  selector: 'app-tab-detail',
  templateUrl: './tab-detail.page.html',
  styleUrls: ['./tab-detail.page.scss'],
})
export class TabDetailPage implements OnInit {

  constructor(private route: ActivatedRoute,private afStorage : AngularFireStorage,
    public dataServ : DataPhotoService,private router: Router,afs : AngularFirestore) {  
      this.isiDataColl = afs.collection('dataNotes');
    }
  isiDataManip : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;
  linkPOTO : String;
  tampil: boolean;
  Data : data;
  idDB : String;
  judul :String;
  isinote : String;
  tanggal : String;
  nilai : number;

  juduledit :String;
  isinoteedit : String;
  tanggaledit : String;
  nilaiedit = 0;
  linkPOTOEdit : String;
  TambahFoto(){
    this.dataServ.tambahFoto()
  }
  ngOnInit() {
    if(this.route.snapshot.paramMap.get("id")){
      let tempID = this.route.snapshot.paramMap.get("id");
      this.idDB = tempID 
      let tempjudul = this.route.snapshot.paramMap.get("judul");
      this.judul = tempjudul
      let tempisi = this.route.snapshot.paramMap.get("isinotes");
      this.isinote = tempisi
      let temptanggal = this.route.snapshot.paramMap.get("tanggal");
      this.tanggal = temptanggal
      let tempnilai = this.route.snapshot.paramMap.get("nilai");
      this.nilai= Number(tempnilai)
      let tempLink = this.route.snapshot.paramMap.get("linkStorage");
      this.linkPOTO = tempLink
      this.tampil = true
    }
  }

  edit(){
    this.tampil = false
  }
  delete(){
    this.isiDataColl.doc(String(this.idDB)).delete()
    this.router.navigate(['/tabs/tab1'])
  }
  editNote(){
    var data = {};
    console.log()
    data["id"]=this.idDB
    data["judul"]=this.juduledit
    data["isinotes"]=this.isinoteedit
    data["tanggal"]=this.tanggaledit
    data["nilai"]=this.nilaiedit
    data["linkStorage"]="this.linkPOTOEdit"
    this.isiDataColl.doc(String(this.idDB)).update(data)
    this.router.navigate(['/tabs/tab1'])
  }

  // async ambilData(id:String){
    
  //   // console.log(this.Data)
  //   var DataManip=[];
  //   var temp=[];
  //   var counter=0;
  //   var dataany:data;
  //   this.isiDataManip = this.isiDataColl.snapshotChanges().pipe(
  //     map(actions => {
  //       return actions.map(a => {
  //         const data = a.payload.doc.data();
  //         const id = a.payload.doc.id;
  //         return { id, ...data };
  //       });
  //     })
  //   ); 
  //   this.isiDataManip.forEach(function (item){
  //     for(var i=0;i<item.length;i++){
  //       if(id==item[i].id){
  //         dataany=item[i]
  //       }
        
  //     }
  //   })
  //   this.Data = dataany
  //   console.log(this.Data)
  // }
  
}

interface data{
  id:String,
  judul:String,
  isinotes:String,
  tanggal:String,
  nilai:number,
  linkStorage:String,
}
