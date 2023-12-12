import { AddZerosPipe } from './add-zeros.pipe';

describe('AddZerosPipe', () => {
  it('create an instance', () => {
    const pipe = new AddZerosPipe();
    expect(pipe).toBeTruthy();
  });
});
