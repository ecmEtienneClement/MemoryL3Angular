import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/env/env';

@Injectable()
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  //
  public signInEntitie(email: string, mdp: string): Observable<resLogin> {
    return this.httpClient
      .post<resLogin>(environment.hostDev + 'signIn/', {
        email,
        mdp,
      })
      .pipe(retry(1));
  }
}
interface resLogin {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  ip: string;
  userAg: string;
  token: string;
}
