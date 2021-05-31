import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, switchMap} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private readonly http: HttpClient) {
  }

  login({email, password}: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, {email, password})
      .pipe(switchMap(({access_token}: any) => {
        AuthService.setAccessToken(access_token);

        return this.me();
      }));
  }

  register({email, password}: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register`, {email, password})
      .pipe(switchMap(({access_token}: any) => {
        AuthService.setAccessToken(access_token);

        return this.me();
      }));
  }

  logout(): Observable<any> {
    return Observable.create(() => {
      this.currentUserSubject.next(null);
      AuthService.removeAccessToken();
    });
  }

  me(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/auth/me`, {headers: {'Authorization': 'Bearer ' + AuthService.getAccessToken()}})
      .pipe(map(user => {
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  private static setAccessToken(access_token: string) {
    return localStorage.setItem('access_token', access_token);
  }

  private static getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private static removeAccessToken() {
    return localStorage.removeItem('access_token');
  }

  public hasAccessToken(): boolean {
    return AuthService.getAccessToken() != null
  }

  public getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  public getCurrentUserSync(): any {
    return this.currentUserSubject.value;
  }

  public isLoggedIn(): boolean {
    return this.hasAccessToken();
  }
}
