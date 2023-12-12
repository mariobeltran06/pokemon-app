import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardPokemonComponent } from 'src/app/components/card-pokemon/card-pokemon.component';
import { CardProfileComponent } from 'src/app/components/card-profile/card-profile.component';
import { IPokemonFirstGeneration } from 'src/app/core/interfaces/first-generation-pokemon.interface';
import { IInfoCardProfile } from 'src/app/core/interfaces/info-card-profile.interface';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import {
  selectFinishState,
  selectPokemons,
} from 'src/app/store/selectors/pokemon.selector';
import { selectAllProfile } from 'src/app/store/selectors/profile.selector';
import { IAppState } from 'src/app/store/states/app.state';
import { IInfoProfileState } from 'src/app/store/states/profile.state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';

@UntilDestroy()
@Component({
  selector: 'app-finished-profile',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    CardProfileComponent,
    CardPokemonComponent,
  ],
  templateUrl: './finished-profile.component.html',
  styleUrls: ['./finished-profile.component.scss'],
})
export class FinishedProfileComponent implements OnInit {
  loading: boolean = false;
  nameCoach: string = '';
  photo: string | null = null;
  infoCoach: IInfoCardProfile | null = null;
  pokeDex: IPokemonFirstGeneration[] = [];
  finished: boolean = false;

  constructor(private router: Router, private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.getAllItemsInStore();
  }

  getAllItemsInStore(): void {
    this.store
      .select(selectAllProfile)
      .pipe(untilDestroyed(this))
      .subscribe((profile: IInfoProfileState) => {
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
    this.store
      .select(selectPokemons)
      .pipe(untilDestroyed(this))
      .subscribe((pokemons: IPokemonFirstGeneration[]) => {
        this.pokeDex = pokemons;
      });
    this.store
      .select(selectFinishState)
      .pipe(untilDestroyed(this))
      .subscribe((finish: boolean) => {
        this.finished = finish;
      });
  }

  get firstNameCoach(): string {
    return this.nameCoach.split(' ')[0];
  }

  sendRoute(route: string): void {
    this.router.navigate([route]);
  }
}
