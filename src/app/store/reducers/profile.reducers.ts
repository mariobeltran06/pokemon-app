import { createFeature, createReducer, on } from '@ngrx/store';
import { ProfileActions } from '../actions/profile.actions';
import { profileInitialState } from '../states/profile.state';

export const profileFeature = createFeature({
  name: 'profile',
  reducer: createReducer(
    profileInitialState,
    on(ProfileActions.saveProfile, (state, { profile }) => ({
      ...state,
      ...profile,
    }))
  ),
});
