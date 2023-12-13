import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Routes } from '@angular/router';
import { MY_FORMATS } from './core/constants/my-formats.constant';
import { ListPokemonService } from './core/services/list-pokemon.service';
import { FinishedProfileComponent } from './pages/finished-profile/finished-profile.component';
import { GenerateProfileCoachComponent } from './pages/generate-profile-coach/generate-profile-coach.component';
import { SelectionPokemonComponent } from './pages/selection-pokemon/selection-pokemon.component';

export const routes: Routes = [
  {
    path: '',
    component: GenerateProfileCoachComponent,
    providers: [
      {
        provide: MAT_DATE_LOCALE,
        useValue: 'es-GB',
      },
      {
        provide: MAT_DATE_FORMATS,
        useValue: MY_FORMATS,
      },
    ],
  },
  {
    path: 'seleccion-pokemon',
    component: SelectionPokemonComponent,
    providers: [ListPokemonService],
  },
  {
    path: 'perfil-finalizado',
    component: FinishedProfileComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
