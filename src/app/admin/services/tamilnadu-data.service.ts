import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TamilnaduDataService {

  private tamilnaduData="https://api.covid19india.org/state_district_wise.json";
  constructor(private http:HttpClient) { }

  district=[];
  getTamilnaduData():Observable<any>{
    return this.http.get(this.tamilnaduData).pipe(map(res=>{
      let object=res;
      let data=object["Tamil Nadu"].districtData;
      for(let cs in data){
        let raw={
          district:cs,
          active:data[cs].active,
          confirmed:data[cs].confirmed,
          decreased:data[cs].deceased,
          recovered:data[cs].recovered
        }
        this.district.push(raw);
      }
      this.district.splice(0,3);
      return this.district;
    }))
  }
}
