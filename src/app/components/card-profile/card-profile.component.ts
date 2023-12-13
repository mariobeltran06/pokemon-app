import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IInfoCardProfile } from 'src/app/core/interfaces/info-card-profile.interface';
import { TruncatePipe } from 'src/app/core/pipes/truncate.pipe';
import { ParagraphComponent } from 'src/app/shared/components/paragraph/paragraph.component';
import { SvgIconComponent } from 'src/app/shared/components/svg-icon/svg-icon.component';
import { UploadFileComponent } from 'src/app/shared/components/upload-file/upload-file.component';

@Component({
  selector: 'app-card-profile',
  standalone: true,
  imports: [
    CommonModule,
    SvgIconComponent,
    UploadFileComponent,
    ParagraphComponent,
    TruncatePipe,
  ],
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.scss'],
})
export class CardProfileComponent {
  @Input() nameCoach: string | null = null;
  @Input() finished: boolean = false;
  @Input() coachImage: string | null = null;
  @Input() infoProfile: IInfoCardProfile | null = null;
  @Output() filePhoto = new EventEmitter<string | null>();

  changeUploadFile(base64: string | null): void {
    this.coachImage = base64;
    this.filePhoto.emit(base64);
  }
}
