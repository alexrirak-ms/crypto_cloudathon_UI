import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import {HttpClient, HttpHeaders} from '@angular/common/http';
// import { map } from 'rxjs/operators';


import { AuthApiService } from '..';
@Injectable()
export class RewardsApiService {
    constructor(private http: HttpClient, private authApiService: AuthApiService){

    }
    getUserToken(){
      return this.authApiService.getUserToken();
    }
    
    getRewardsInitData(userID: string){
      return this.http.get("//crypto-banksters-rewards-account.azurewebsites.net/InvestmentAccount/" + userID)
    }
    
    executeTransaction(currencyAmount: any) {
      console.log('PIZZA' + currencyAmount);
      return this.http.get("//crypto-banksters-rewards-account.azurewebsites.net/InvestmentAccount/SupportedCoins")
    }
}