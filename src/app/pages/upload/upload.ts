import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UploadService } from './../../services/upload'
import { AuthService } from '../../services/auth';
import { Header } from './../header/header';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload',
  imports: [FormsModule, Header],
  templateUrl: './upload.html',
  styleUrl: './upload.css'
})
export class Upload {
  constructor(
    private uploadService: UploadService,
    private authService: AuthService,
    private router: Router
  ) {}

  selectedFile: File | null = null;
  password = '';

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
  }

  async upload() {

     const userId = await this.authService.getCurrentUserId();

    if (!this.selectedFile) {
      return;
    }
    this.uploadService
      .getUploadUrl(this.selectedFile.name, userId )
      .subscribe({

        next: response => {

          const uploadUrl = response.uploadUrl;

          this.uploadService
            .uploadFileToS3(
              uploadUrl,
              this.selectedFile!
            )
            .subscribe({
              next: () => {
                console.log(
                  'File uploaded successfully!'
                );
                this.router.navigate(['/files']);
              },

              error: error => {
                console.error(error);
              }
            });

        },
        error: error => {
          console.error(error);
        }
      });

  }
}
