import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private apiUrl = 'https://1yrh87a5fa.execute-api.ap-south-1.amazonaws.com/Prod';

  constructor(
    private http: HttpClient
  ) {}

  getUploadUrl(filename: string) {

    return this.http.post<any>(
      `${this.apiUrl}/upload-url`,
      { filename }
    );

  }
}
