import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-pokemon.component.html',
  styleUrls: ['./loading-pokemon.component.scss'],
})
export class LoadingPokemonComponent {
  @Input() title: string = 'Cargando...';
}
