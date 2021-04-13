import { Router } from '@angular/router';
import { Photo } from './../Services/data-photo.service';
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
  urlImageStorage : string[] = [];
  counter = 0;
  isi:String;
  ImageStorage:Photo[]=[];
  tanggalTulis:String;
  isiDataColl : AngularFirestoreCollection<data>;
  constructor(public dataServ:DataPhotoService,private afStorage : AngularFireStorage,afs : AngularFirestore,private router: Router) {
    this.isiDataColl = afs.collection('dataNotes');
    for (var index in this.ImageStorage){
      if(this.ImageStorage[index].selected == true){
        this.ImageStorage[index].selected = false;
      }
    }
  }
  async ngOnInit(){
    await this.dataServ.loadFoto();
    this.ImageStorage = this.dataServ.dataFoto
    for (var index in this.ImageStorage){
      if(this.ImageStorage[index].selected == true){
        this.ImageStorage[index].selected = false;
      }
    }
   }
  async TambahFoto(){
   this.dataServ.tambahFoto();
    
  }
  SelectedFoto(dataFoto: Photo){
    for(var i = 0;i<this.ImageStorage.length; i++){
      console.log(this.ImageStorage[i].nama + " === "+ dataFoto.nama)
      if(this.ImageStorage[i].nama == dataFoto.nama){
        console.log(this.ImageStorage[i].selected)
        if(this.ImageStorage[i].selected == true){
          this.ImageStorage[i].selected = false;
        }else{
          this.ImageStorage[i].selected = true;
        }
      }
    }
  }

  async UploadFoto(){
    this.counter = 0;
    for (var index in this.ImageStorage){
      if(this.ImageStorage[index].selected == true){
        const imgFilepath = `imgStorage/${this.ImageStorage[index].filePath}`;
        this.afStorage.upload(imgFilepath,this.ImageStorage[index].dataImage).then(() => {
          this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url)=>{
            this.urlImageStorage.unshift(url);
            console.log(url)
          });
        });
        this.counter = 1;
      }
    }
    if(this.counter==1){
      return true
    }else{
    
      return false
    }
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


  async TambahNotes(){
    
    if(this.UploadFoto()){

      var tanggal = new Date().getDate()
      var bulan = new Date().getMonth()+1
      var tahun = new Date().getFullYear()
      var date = String(tanggal)+" "+String(bulan)+" "+String(tahun)
      var idDB = new Date().getTime()+String(tanggal)+String(bulan)+String(tahun)+this.judul
      var link = ""
      alert(idDB)
      await this.delay(4000)
      for(var i = 0;i<this.urlImageStorage.length;i++){
        alert(i +" "+ this.urlImageStorage[i])
        
        if(i==this.urlImageStorage.length-1){
          link+=this.urlImageStorage[i]
        }else{
          link+=this.urlImageStorage[i]+","
        }
      }
      alert(link)
      var temp = {
          id: idDB,
          judul : this.judul,
          isinotes : this.isi,
          nilai:this.range,
          tanggal:this.tanggalTulis,
          linkStorage:link
      }
      this.isiDataColl.doc(idDB).set(temp);
      alert("Tambah Notes Berhasil")
      this.router.navigate(['/tabs/tab1'])
    }else{
      alert("You must pick at least 1 Photo to upload")
    }
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
