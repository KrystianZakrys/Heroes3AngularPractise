import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataServiceService implements InMemoryDbService{
  
  constructor() { }

  createDb(){
    const heroes = [
      {id: 1, name: 'Christian', avatarUrl: 'https://heroes.thelazy.net/images/archive/f/f8/20180130004359%21Hero_Christian.png', type: 'Knight', skills: ['Basic Leadership','Basic Artilery'], speciality: 'Ballista', spell: ''},
      {id: 2, name: 'Edric', avatarUrl: 'https://heroes.thelazy.net/images/archive/7/7f/20180130004426%21Hero_Edric.png', type: 'Knight', skills: ['Basic Leadership','Basic Armorer'], speciality: 'Griffins', spell: ''},
      {id: 3, name: 'Orrin', avatarUrl: 'https://heroes.thelazy.net/images/4/4a/Hero_Orrin.png', type: 'Knight', skills: ['Basic Leadership','Basic Archery'], speciality: 'Archery', spell: ''},
    ];
    return {heroes};
  }

  genId(heroes: Hero[]): number{
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id))+ 1: 1;
  }
}
