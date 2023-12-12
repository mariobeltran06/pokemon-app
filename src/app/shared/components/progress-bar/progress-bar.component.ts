import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IColorBar } from './types/type-color';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent {
  @Input() process: number = 10;
  @Input() totalProcess: number = 100;
  @Input() color: IColorBar = 'green';
  @Input() widthProgressBar: string = '160px';

  get width(): string {
    return (this.process / this.totalProcess) * 100 + '%';
  }

  get allClasses(): object {
    return {
      [this.color]: true,
    };
  }
}
