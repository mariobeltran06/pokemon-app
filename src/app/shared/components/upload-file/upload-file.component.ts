import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ParagraphComponent } from '../paragraph/paragraph.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [CommonModule, ParagraphComponent, SvgIconComponent],
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  @Input() text: string = 'Adjunta una foto';
  @Output() fileUpload = new EventEmitter<string | null>();
  isDragging: boolean = false;
  isFile: boolean = false;
  isError: boolean = false;

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.handleFile(file);
    }
    this.isDragging = false;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onFileSelected(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const selectedFile: FileList | null = target.files;
    if (selectedFile) {
      this.handleFile(selectedFile[0]);
    }
  }

  handleClickInput(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    const input = this.fileInput.nativeElement as HTMLInputElement;
    input.click();
  }

  deleteActualFile(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.text = 'Adjunta una foto';
    this.isFile = false;
    this.isError = false;
    this.fileUpload.emit(null);
  }

  private handleFile(file: File): void {
    this.text = file.name;
    this.isFile = true;
    if (this.isValidFile(file)) {
      this.isError = false;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          const base64String = reader.result as string;
          this.fileUpload.emit(base64String);
        } else {
          this.fileUpload.emit(null);
        }
      };
    } else {
      this.fileUpload.emit(null);
      this.isError = true;
    }
  }

  private isValidFile(file: File): boolean {
    const allowedExtensions = ['.jpg', '.png', '.jpeg'];
    const maxSize = 1024 * 1024;
    const fileExtension = file.name
      .toLocaleLowerCase()
      .substring(file.name.lastIndexOf('.'));
    const isValidFileExtension = allowedExtensions.includes(fileExtension);
    const isSizeValid = file.size <= maxSize;
    return isValidFileExtension && isSizeValid;
  }
}
