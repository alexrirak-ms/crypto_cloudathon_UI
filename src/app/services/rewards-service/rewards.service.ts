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
    
    executeTransaction(currencyAmount: any, Currency: any, accountFromTo: any) {
      console.log('PIZZA' + currencyAmount + " " + Currency + " " + accountFromTo);
      if(accountFromTo == "To")
      {
        // console.log("//crypto-banksters-rewards-account.azurewebsites.net/InvestmentAccount/" +  currencyAmount + "/e16666ff-c559-4aab-96eb-f0a5c2c77b18/" + Currency);
        return this.http.get("//crypto-banksters-rewards-account.azurewebsites.net/InvestmentAccount/TransfersTo/" +  currencyAmount + "/e16666ff-c559-4aab-96eb-f0a5c2c77b18/" + Currency)
      }
      else if(accountFromTo == "From")
      {
        console.log("BIG TEST FROM");
      }
      return this.http.get("//crypto-banksters-rewards-account.azurewebsites.net/InvestmentAccount/SupportedCoins")
    }
}