import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionPokemonComponent } from './selection-pokemon.component';

describe('SelectionPokemonComponent', () => {
  let component: SelectionPokemonComponent;
  let fixture: ComponentFixture<SelectionPokemonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SelectionPokemonComponent]
    });
    fixture = TestBed.createComponent(SelectionPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
