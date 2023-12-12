import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Routes } from '@angular/router';
import { MY_FORMATS } from './core/constants/my-formats.constant';
import { GenerateProfileCoachComponent } from './pages/generate-profile-coach/generate-profile-coach.component';

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
];
