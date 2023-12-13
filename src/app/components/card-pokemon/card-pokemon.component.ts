import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  STATS_LABEL,
  STATS_MAX_LEVEL,
} from 'src/app/core/constants/stats-spanish.constant';
import { TYPES_LABEL } from 'src/app/core/constants/types-spanish.constant';
import { IPokemonFirstGeneration } from 'src/app/core/interfaces/first-generation-pokemon.interface';
import {
  IPokemonStats,
  IPokemonType,
  IResponsePokemon,
} from 'src/app/core/interfaces/pokemon-stats.interface';
import { IStat } from 'src/app/core/interfaces/stats-spanish.interface';
import { ListPokemonService } from 'src/app/core/services/list-pokemon.service';
import { ProgressBarComponent } from 'src/app/shared/components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-card-pokemon',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent],
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.scss'],
  providers: [ListPokemonService],
})
export class CardPokemonComponent implements OnInit {
  @Input() pokemon: IPokemonFirstGeneration | null = null
  @Input() index: number = 0;
  image: string | null = null;
  types: string[] = [];
  stats: IStat[] = [];
  constructor(private listPokemonService: ListPokemonService) {}
  ngOnInit(): void {
    if (this.pokemon) {
      this.listPokemonService
        .getPokemonInfoStats(this.pokemon.id)
        .subscribe((poke: IResponsePokemon) => {
          this.image = poke.sprites.other.home.front_default;
          this.types = poke.types.map(
            (type: IPokemonType) => TYPES_LABEL[type.type.name]
          );
          this.stats = poke.stats.map((stat: IPokemonStats) => {
            const newFormat: IStat = {
              name: STATS_LABEL[stat.stat.name],
              count: stat.base_stat,
              countMax: STATS_MAX_LEVEL[stat.stat.name],
            };
            return newFormat;
          });
        });
    }
  }

  get formatTypePokemon(): string {
    if (this.types.length === 1) {
      return this.types[0];
    } else if (this.types.length >= 2) {
      return this.types[0] + '/' + this.types[1];
    }
    return '???';
  }
}
