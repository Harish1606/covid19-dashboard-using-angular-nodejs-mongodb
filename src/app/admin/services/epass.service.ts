import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EpassService {

  constructor(private http:HttpClient) { }

  public createDistrict(epass:Object):Observable<Object>{
    return this.http.post('api/postEpass',epass);
  }

  public getDistricts():Observable<any>{
    return this.http.get('api/getEpass');
  }

  public deleteDistrict(_id):Observable<any>{
    return this.http.delete('api/deleteEpass/'+_id,{responseType:'text'});
  }

}
