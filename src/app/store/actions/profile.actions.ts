import { IInfoProfile } from 'src/app/core/interfaces/info-profile.interface';
import { createActionGroup, props } from '@ngrx/store';

export const ProfileActions = createActionGroup({
  source: 'profile',
  events: {
    'Save Profile': props<{ profile: IInfoProfile }>(),
  },
});
