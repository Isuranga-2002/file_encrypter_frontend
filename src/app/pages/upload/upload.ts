import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload',
  imports: [FormsModule],
  templateUrl: './upload.html',
  styleUrl: './upload.css',
})
export class Upload {
  selectedFile: File | null = null;
  password = '';

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
  }

  upload(){
    console.log(this.selectedFile);
    console.log(this.password);
  }
}
