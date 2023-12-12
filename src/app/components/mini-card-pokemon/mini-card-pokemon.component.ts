import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IPokemonFirstGeneration,
  IResponseSpritePokemon,
} from 'src/app/core/interfaces/first-generation-pokemon.interface';
import { AddZerosPipe } from 'src/app/core/pipes/add-zeros.pipe';
import { ListPokemonService } from 'src/app/core/services/list-pokemon.service';

@Component({
  selector: 'app-mini-card-pokemon',
  standalone: true,
  imports: [CommonModule, AddZerosPipe],
  templateUrl: './mini-card-pokemon.component.html',
  styleUrls: ['./mini-card-pokemon.component.scss'],
  providers: [ListPokemonService],
})
export class MiniCardPokemonComponent implements OnInit {
  @Input() pokemon: IPokemonFirstGeneration | null = null;
  @Input() selected: boolean = false;
  @Input() disabled: boolean = false;
  @Output() emitClick = new EventEmitter<MouseEvent>();
  image: string | null = null;

  constructor(private listPokemonService: ListPokemonService) {}

  ngOnInit(): void {
    if (this.pokemon) {
      this.listPokemonService
        .getSpritePokemon(this.pokemon.id)
        .subscribe((response: IResponseSpritePokemon) => {
          this.image = response.sprites.other.home.front_default;
        });
    }
  }

  sendClick(): void {
    if (!this.disabled) {
      this.emitClick.emit();
    }
  }
}
