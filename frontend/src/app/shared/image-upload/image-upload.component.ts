import { Component, EventEmitter, Output } from '@angular/core';
import { ImageUploadService } from 'src/app/core/services/image-upload/image-upload.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent {
  @Output() filePath = new EventEmitter<string>();
  fileName = '';

  constructor(private upload: ImageUploadService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append('file', file);
      this.filePath.emit(this.fileName);

      this.upload.uploadService(formData).subscribe();
    }
  }
}
