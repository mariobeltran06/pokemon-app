import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCardPokemonComponent } from './mini-card-pokemon.component';

describe('MiniCardPokemonComponent', () => {
  let component: MiniCardPokemonComponent;
  let fixture: ComponentFixture<MiniCardPokemonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MiniCardPokemonComponent]
    });
    fixture = TestBed.createComponent(MiniCardPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
