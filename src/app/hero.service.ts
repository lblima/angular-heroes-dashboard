import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { IHero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

@Injectable()
export class HeroService {

  constructor(private messageService: MessageService, private http: HttpClient) { }

  getHeroes(): Observable<IHero[]> {
    this.messageService.add('HeroService: fetched heroes.');
    return this.http.get<IHero[]>("http://localhost:55113/api/Heroes");
  }

  getHero(id: number): Observable<IHero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return this.http.get<IHero>(`http://localhost:55113/api/Heroes/${id}`);
  }
}