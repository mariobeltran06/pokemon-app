import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IFontFamily } from '../../types/shared-types';
import { ITextColor } from './types/paragraph.types';

@Component({
  selector: 'app-paragraph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss'],
})
export class ParagraphComponent {
  @Input() content: string | null = '';
  @Input() fontSize: string = '1rem';
  @Input() fontFamily: IFontFamily = 'regular';
  @Input() letterSpacing: string = 'normal';
  @Input() margin: string = '0';
  @Input() lineHeight: string | number = 'normal';
  @Input() color: ITextColor = 'neutral-gray';

  get allClasses(): object {
    return {
      [this.fontFamily]: true,
      [this.color]: true,
    };
  }
}
