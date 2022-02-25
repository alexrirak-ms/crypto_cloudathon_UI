import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable()
export class SendReceiveApiService {
    constructor(private http: HttpClient){

    }
    
    getSendReceiveInitData(param1: any){
        //not actually required
        // @ts-ignore
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };
        var postData = {
            "param1": param1
        }
        return this.http.post("/CryptoBanksters/SendReceive/InitData", postData).pipe(map(data => data))
    }
}