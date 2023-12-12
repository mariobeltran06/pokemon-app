import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResponseFisrtGeneration } from '../interfaces/first-generation-pokemon.interface';
import { IResponsePokemon } from '../interfaces/pokemon-stats.interface';
import { IResponseSpritePokemon } from '../interfaces/sprite-pokemon.interface';

@Injectable()
export class ListPokemonService {
  constructor(private http: HttpClient) {}

  getListPokemonFirstGeneration(): Observable<IResponseFisrtGeneration> {
    return this.http.get<IResponseFisrtGeneration>(
      `${environment.urlBackendPokemon}/generation/1`
    );
  }

  getSpritePokemon(id: number): Observable<IResponseSpritePokemon> {
    return this.http.get<IResponseSpritePokemon>(
      `${environment.urlBackendPokemon}/pokemon/${id}`
    );
  }

  getPokemonInfoStats(id: number): Observable<IResponsePokemon> {
    return this.http.get<IResponsePokemon>(
      `${environment.urlBackendPokemon}/pokemon/${id}`
    );
  }
}
