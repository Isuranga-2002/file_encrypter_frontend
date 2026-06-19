import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Import CDR
import { CommonModule } from '@angular/common';
import { UploadService } from '../../services/upload';

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
    private cdr: ChangeDetectorRef // 2. Inject it
  ) {}

  ngOnInit(): void {
    this.loadFiles();
  }

  loadFiles(): void {
    this.uploadService.getFiles().subscribe({
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
}