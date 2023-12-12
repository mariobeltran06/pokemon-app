import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingPokemonComponent } from './loading-pokemon.component';

describe('LoadingPokemonComponent', () => {
  let component: LoadingPokemonComponent;
  let fixture: ComponentFixture<LoadingPokemonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoadingPokemonComponent]
    });
    fixture = TestBed.createComponent(LoadingPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
