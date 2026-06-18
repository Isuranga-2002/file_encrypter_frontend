import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UploadService } from './../../services/upload'

@Component({
  selector: 'app-upload',
  imports: [FormsModule],
  templateUrl: './upload.html',
  styleUrl: './upload.css',
})
export class Upload {
  constructor(
    private uploadService: UploadService
  ) {}

  selectedFile: File | null = null;
  password = '';

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
  }

  upload(){
    if (!this.selectedFile) {
      return;
    }

    this.uploadService
      .getUploadUrl(this.selectedFile.name)
      .subscribe({

        next: response => {

          console.log(response);

        },

        error: error => {

          console.error(error);

        }

      });
  }
}
