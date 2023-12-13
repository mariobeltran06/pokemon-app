import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFontFamily } from '../../types/shared-types';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { IButtonClass, IButtonPositionIcon } from './types/button-types';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() text!: string;
  @Input() class: IButtonClass = 'primary';
  @Input() disabled: boolean = false;
  @Input() icon: string | null = null;
  @Input() iconSize: number = 24;
  @Input() iconPosition: IButtonPositionIcon = 'prefix';
  @Input() iconColor: string = '#01426a';
  @Input() fontSize: string = '1.125rem';
  @Input() width: string = '100%';
  @Input() height: string = '50px';
  @Input() fontFamily: IFontFamily = 'semibold';
  @Output() emitClick: EventEmitter<MouseEvent> = new EventEmitter();

  get allClasses(): object {
    return {
      [this.class]: true,
      disabled: this.disabled,
      [this.fontFamily]: true,
    };
  }

  triggerClick(): void {
    this.emitClick.emit();
  }
}
