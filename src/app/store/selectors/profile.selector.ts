import { createSelector } from '@ngrx/store';
import { IAppState } from '../states/app.state';
import { IInfoProfileState } from '../states/profile.state';

export const selectProfile = (state: IAppState) => state.profile;

export const selectAllProfile = createSelector(
  selectProfile,
  (state: IInfoProfileState) => state
);
