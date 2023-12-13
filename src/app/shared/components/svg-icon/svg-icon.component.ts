import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  template: `<svg
    attr.width="{{ width }}"
    attr.height="{{ height }}"
    attr.fill="{{ fill }}"
    attr.class="{{ class }}"
    attr.style="{{ style }}">
    <use attr.xlink:href="assets/icons/{{ icon }}.svg#{{ icon }}"></use>
  </svg>`,
})
export class SvgIconComponent implements OnInit {
  @Input() icon!: string;
  @Input() width?: number;
  @Input() height?: number;
  @Input() size: number = 24;
  @Input() fill: string = '#01426a';
  @Input() class?: string;
  @Input() style?: string;

  ngOnInit(): void {
    if (!this.width || !this.height) {
      this.width = this.size;
      this.height = this.size;
    }
  }
}
