import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UploadService } from './../../services/upload'
import { AuthService } from '../../services/auth';
@Component({
  selector: 'app-upload',
  imports: [FormsModule],
  templateUrl: './upload.html',
  styleUrl: './upload.css',
})
export class Upload {
  constructor(
    private uploadService: UploadService,
    private authService: AuthService
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
