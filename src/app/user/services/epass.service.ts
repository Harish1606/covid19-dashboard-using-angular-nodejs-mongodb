import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserEpass } from '../modules/userEpass';

@Injectable({
  providedIn: 'root'
})
export class EpassService {

  constructor(private http:HttpClient) { }

  public getDistricts():Observable<any>{
    return this.http.get('api/getEpass');
  }

  public userEpass(epass:UserEpass):Observable<any>{
    return this.http.post<any>('api/userEpass',epass);
  }

}
