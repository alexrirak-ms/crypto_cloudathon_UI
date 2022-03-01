import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthApiService } from '..';
@Injectable()
export class PortfolioApiService {
    constructor(private http: HttpClient, private authApiService: AuthApiService){

    }
    getUserToken(){
      return this.authApiService.getUserToken();
    }
    getPortfolioRewardsData(){
      let userId = this.getUserToken()
      return this.http.get("https://crypto-banksters-rewards-account.azurewebsites.net/InvestmentAccount/" + userId)
    }
    getPortfolioAccountData(){
      let userId = this.getUserToken()
      let params = new HttpParams().set("include_values", "True") //hardcoded to True for now, always create a new user
      return this.http.get("https://crypto-banksters-wallet-api.azurewebsites.net/wallets/user/" + userId, {params: params})
    }
    
    getPortfolioInitData(param1: any){
        var postData = {
            "param1": param1
        }
        return this.http.post("/CryptoBanksters/Portfolio/InitData", postData).pipe(map(data => data))
    }
}