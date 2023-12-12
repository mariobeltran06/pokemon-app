import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { SvgIconComponent } from 'src/app/shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, SvgIconComponent, ButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  nameCoach: string | null = 'Mario';
  finished: boolean = false;

  open(): void {
    console.log(this.nameCoach);
  }
}
