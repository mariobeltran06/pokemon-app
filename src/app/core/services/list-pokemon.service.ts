import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  IResponseFisrtGeneration,
  IResponseSpritePokemon,
} from '../interfaces/first-generation-pokemon.interface';

@Injectable()
export class ListPokemonService {
  constructor(private http: HttpClient) {}

  getListPokemonFirstGeneration() {
    return this.http.get<IResponseFisrtGeneration>(
      `${environment.urlBackendPokemon}/generation/1`
    );
  }

  getSpritePokemon(id: number) {
    return this.http.get<IResponseSpritePokemon>(
      `${environment.urlBackendPokemon}/pokemon/${id}`
    );
  }
}
