import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { UploadService } from '../../services/upload';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './files.html',
  styleUrls: ['./files.css']
})
export class Files implements OnInit {

  files: any[] = [];

  constructor(
    private uploadService: UploadService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadFiles();
  }

  async loadFiles(): Promise<void> {

    const userId = await this.authService.getCurrentUserId();

    this.uploadService.getFiles(userId).subscribe({
      next: (data: any[]) => {
        this.files = data;
        
        // 3. Force Angular to update the UI
        this.cdr.detectChanges(); 
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  downloadFile(jobId: string) {

    this.uploadService
        .getDownloadUrl(jobId)
        .subscribe({

          next: (response) => {

            window.open(
              response.downloadUrl,
              '_blank'
            );

          },

          error: (error) => {

            console.error(error);

          }

        });

  }
}