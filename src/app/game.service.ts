import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Game } from './game';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient,
  ) { }
  
  private gamesURL = 'https://api.rawg.io/api';  // URL to web api
  private apiKey = '60258eefe89a4308aac0765842111223'; // Api personal key

  /** GET the games from the api */
  getGamesFromApi(): Observable<any>{
    const url = `${this.gamesURL}/games?key=${this.apiKey}`
    console.log(url);   
    const response = this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched games from api`)),
      catchError(this.handleError<Game>(`getGame from api`))
    );
    return response;
  }

   /** GET game by id. Will 404 if id not found */
   getGame(id: number): Observable<any> {
    const url = `${this.gamesURL}/games/${id}?key=${this.apiKey}`;
    const response = this.http.get<any>(url).pipe(
      tap(_ => console.log(`fetched game id=${id}`)),
      catchError(this.handleError<Game>(`getGame id=${id}`))
    );
    return response;
  }

    /* GET heroes whose name contains search term */
    searchGames(term: string): Observable<any> {
      if (!term.trim()) {
        // if not search term, return empty hero array.
        return of([]);
      }
      const url = `${this.gamesURL}/games?key=${this.apiKey}&search='${term}'`;
      console.log(url);
      return this.http.get<any>(url).pipe(
        tap(x => x.length ?
          console.log(`found heroes matching "${term}"`) :
          console.log(`no heroes matching "${term}"`)),
        catchError(this.handleError<Game[]>('searchHeroes', []))
      );
    }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
