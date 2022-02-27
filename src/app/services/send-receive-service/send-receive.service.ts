import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthApiService } from '..';

@Injectable()
export class SendReceiveApiService {
	constructor(private http: HttpClient, private authApiService: AuthApiService){

    }
    getUserToken(){
      return this.authApiService.getUserToken();
    }

	getSendReceiveInitData(user: string) {
		return this.http.get("//crypto-banksters-wallet-api.azurewebsites.net/wallets/user/" + user + "?include_values=True")
	}

	getCoinValue(symbol: string) {
		return this.http.get("//crypto-banksters-wallet-api.azurewebsites.net/usd-value/" + symbol)
	}
}