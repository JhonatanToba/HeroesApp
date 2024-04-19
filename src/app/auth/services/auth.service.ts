import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map, of, tap } from 'rxjs';

import { environments } from '../../../environments/environments';

import { User } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})

export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { }

  get currentUser(): User|undefined {
    if ( !this.user) {
      return undefined
    }

    return structuredClone(this.user);
  }

  login( email: string, password: string): Observable<User> {

    // this.http.post('login', {email, password});

   return this.http.get<User>(`${this.baseUrl}/users/1`).
    pipe(
      tap( user => this.user = user ),
      tap( user =>  localStorage.setItem( 'token', 'KJAS8N7D7IJ7N4Bij1na4snI7ANNI21N14SJAS78N8a74soMA1O5NSa.asdj51ansodn651OANSIOnas5161oNA.aosINAONSIOnaosL1654' ) )
    );
  }

  checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false);
    }

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap( user => this.user = user ),
        map( user => !!user ),
        catchError( err => of(false))
      );

  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }
}
