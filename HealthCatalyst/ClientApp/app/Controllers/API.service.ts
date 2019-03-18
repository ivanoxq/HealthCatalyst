import { RandomProfile } from '../Models/RandomProfile';
import { CatPhoto } from '../Models/CatPhoto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { text } from '@angular/core/src/render3';

@Injectable() export class APIService {

  private APIURL = "http://localhost:8841/";

  constructor(private http: HttpClient) { }

  public GetRandomCatImage(imageUrl: string): Observable<Object> {
    const methodUrl = `${this.APIURL}/api/API/GetCatUrlImage`;
    const url = `"${imageUrl}"`;

    const rtn = this.http.post<Object>(methodUrl, url, {
      headers: 
      {
          'Content-Type': 'application/json'
      },
      responseType: 'text' as any
    });

    return rtn;
  }

  public GetRandomCatInfo(): Observable<Object> {
    const methodUrl = `${this.APIURL}/api/API/GetCatPhoto`;
    const url = '"https://api.thecatapi.com/v1/images/search/"';

    const rtn = this.http.post<Object>(methodUrl, url, {
      headers: 
      {
          'Content-Type': 'application/json'
      }
    });

    return rtn;
  }

  public GetRandomProfile(): Observable<Object> {
    const methodUrl = `${this.APIURL}/api/API/GetRandomProfile`;
    const url = '"http://randomprofile.com/api/api.php?format=json&countries=GBR&fromAge=18"';

    const rtn = this.http.post(methodUrl, url, {
      headers: 
      {
          'Content-Type': 'application/json'
      }
    });

    return rtn;
  }
}
