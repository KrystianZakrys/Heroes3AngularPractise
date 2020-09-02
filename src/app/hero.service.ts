import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './heroes-mock';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleError<Hero[]>('getHeroes',[]))
      );
  }

  getHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  updateHero(hero: Hero): Observable<Hero>{
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>(`updateHero id=${hero.id}`))
      );
  }

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        catchError(this.handleError<Hero>(`addHero`))
      );
  }

  deleteHero(hero: Hero | number): Observable<Hero>{
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<Hero>(`deleteHero id=${id}`))
      );
  }
  
  searchHeroesByName(term: string): Observable<Hero[]>{
    if(!term.trim()){return of([]);}
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        catchError(this.handleError<Hero[]>('searchHeroes',[]))
      );
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any):Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
