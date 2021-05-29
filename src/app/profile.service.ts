import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  public findOne(username: string | null): Observable<any> {
    const url = `http://localhost:3000/profiles/${username}`;
    return this.http.get<any>(url);
  }

  public findLinks(username: string | null): Observable<any[]> {
    const url = `http://localhost:3000/profiles/${username}/links`;
    return this.http.get<any[]>(url);
  }
}
