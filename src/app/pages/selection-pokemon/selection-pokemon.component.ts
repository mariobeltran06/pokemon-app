import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { CardProfileComponent } from 'src/app/components/card-profile/card-profile.component';
import { LoadingPokemonComponent } from 'src/app/components/loading-pokemon/loading-pokemon.component';
import { MiniCardPokemonComponent } from 'src/app/components/mini-card-pokemon/mini-card-pokemon.component';
import {
  IPokemonFirstGeneration,
  IPokemonSpecie,
  IResponseFisrtGeneration,
} from 'src/app/core/interfaces/first-generation-pokemon.interface';
import { IInfoCardProfile } from 'src/app/core/interfaces/info-card-profile.interface';
import { ListPokemonService } from 'src/app/core/services/list-pokemon.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { SvgIconComponent } from 'src/app/shared/components/svg-icon/svg-icon.component';
import { PokemonActions } from 'src/app/store/actions/pokemon.actions';
import { selectAllProfile } from 'src/app/store/selectors/profile.selector';
import { IAppState } from 'src/app/store/states/app.state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';

@UntilDestroy()
@Component({
  selector: 'app-selection-pokemon',
  standalone: true,
  imports: [
    CommonModule,
    SvgIconComponent,
    ButtonComponent,
    LoadingPokemonComponent,
    CardProfileComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MiniCardPokemonComponent,
  ],
  templateUrl: './selection-pokemon.component.html',
  styleUrls: ['./selection-pokemon.component.scss'],
})
export class SelectionPokemonComponent implements OnInit {
  loading = false;
  formPokemon: FormGroup;
  nameCoach: string | null = null;
  photo: string | null = null;
  infoCoach: IInfoCardProfile | null = null;
  search: FormControl = new FormControl('');
  pokemonsFirstGeneration: IPokemonFirstGeneration[] = [];
  pokemonsFiltered!: Observable<IPokemonFirstGeneration[]>;
  selectedPokemon = new SelectionModel<IPokemonFirstGeneration>(true, []);
  constructor(
    private formbuilder: FormBuilder,
    private store: Store<IAppState>,
    private listPokemonService: ListPokemonService,
    private router: Router
  ) {
    this.store
      .select(selectAllProfile)
      .pipe(untilDestroyed(this))
      .subscribe(profile => {
        if (profile.name) {
          this.nameCoach = profile.name;
          this.photo = profile.photo;
          this.infoCoach = {
            age: profile.age,
            hobby: profile.hobby,
            document: profile.document,
          };
        } else {
          this.router.navigate(['']);
        }
      });
    this.formPokemon = formbuilder.group({
      pokemons: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadPokemons();
    this.pokemonsFiltered = this.search.valueChanges.pipe(
      untilDestroyed(this),
      startWith(''),
      map(value => this.filterPokemon(value || ''))
    );
    this.selectedPokemon.changed.pipe(untilDestroyed(this)).subscribe(() => {
      if (this.selectedPokemon.selected.length === 3) {
        this.formPokemon.controls['pokemons'].setValue(
          this.selectedPokemon.selected
        );
      } else {
        this.formPokemon.controls['pokemons'].setValue(null);
      }
    });
  }

  loadPokemons(): void {
    this.listPokemonService
      .getListPokemonFirstGeneration()
      .subscribe((response: IResponseFisrtGeneration) => {
        this.pokemonsFirstGeneration = response.pokemon_species
          .map((pokemon: IPokemonSpecie) => {
            const id = pokemon.url.split('/')[6];
            return {
              name: pokemon.name,
              id: +id,
            };
          })
          .sort((a, b) => a.id - b.id);
      });
  }

  savePokemons(): void {
    if (this.formPokemon.valid) {
      const { pokemons } = this.formPokemon.value;
      this.loading = true;
      this.store.dispatch(PokemonActions.savePokemons({ pokemons }));
      this.store.dispatch(PokemonActions.finished());
      setTimeout(() => {
        this.router.navigate(['perfil-finalizado']);
      }, 5000);
    }
  }

  private filterPokemon(value: string): IPokemonFirstGeneration[] {
    const filterValue = value.toLowerCase();
    if (filterValue.trim() === '') {
      return this.pokemonsFirstGeneration;
    }
    return this.pokemonsFirstGeneration.filter(
      pokemon =>
        pokemon.id.toString() === filterValue ||
        pokemon.name.toLowerCase().includes(filterValue)
    );
  }
}
