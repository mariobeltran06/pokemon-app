export interface IInfoProfileState {
  name: string | null;
  hobby: string | null;
  birthday: Date | null;
  age: number;
  document: string | null;
  photo: string | null;
}

export const profileInitialState: IInfoProfileState = {
  name: null,
  hobby: null,
  birthday: null,
  age: 0,
  document: null,
  photo: null,
};
