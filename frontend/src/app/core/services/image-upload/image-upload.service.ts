import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  constructor(private http: HttpClient) {}

  uploadService(formData: FormData): Observable<Object> {
    return this.http.post(`${environment.baseUrl}/upload`, formData);
  }
}
