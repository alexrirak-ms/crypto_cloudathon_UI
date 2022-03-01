import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthApiService } from '../index'
@Injectable()
export class BorrowApiService {
    constructor(private http: HttpClient, private authApiService: AuthApiService){

    }
    getUserToken(){
      return this.authApiService.getUserToken();
    }
    getBorrowInitData(param1: any){
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
        return this.http.post("/CryptoBanksters/Borrow/InitData", postData).pipe(map(data => data))
    }
}