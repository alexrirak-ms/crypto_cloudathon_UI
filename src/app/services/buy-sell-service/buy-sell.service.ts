import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {  map  } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BuySellTransaction } from '../../models/buyselltransaction';
import { WalletTransaction } from '../../models/wallettransaction';

@Injectable()
export class BuySellApiService {

  private walletSellTransactionAPI = 'https://crypto-banksters-wallet-api.azurewebsites.net/transaction';
  private walletBuyTrasactionAPI = 'https://crypto-banksters-wallet-api.azurewebsites.net/transaction/fund';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }
    
  getBuySellInitData(param1: any){
      // TODO need to check on watchlist API call
      var postData = {
          "param1": param1
      }
      return this.http.post("/CryptoBanksters/BuySell/InitData", postData).pipe(map(data => data))
  }

  executeTransaction(buySelltransaction: BuySellTransaction): Observable<any> {
    console.log('Transaction Type:' + buySelltransaction.transactionType);
    if(buySelltransaction.transactionType == 'sell') {
      const walletTransaction: WalletTransaction = {
        // TODO need to check on the actual values
        fromWalletId: '1',
        toAddress: 'TestAddress',  
        amount: buySelltransaction.bitcoinAmount 
      };

      console.log(`Amount of bitcoins to be sold: "${walletTransaction.amount}"`);
      return this.http.put(this.walletSellTransactionAPI, walletTransaction, this.httpOptions).pipe(map(data => data))
    }
    else {
      console.log(`Buying bitcoins for amount: "${buySelltransaction.currencyAmount }"`);

      const walletTransaction: WalletTransaction = {
        // TODO need to check on the actual values
        fromWalletId: '1',
        toAddress: 'TestAddress',  
        amount: buySelltransaction.currencyAmount 
      };

      return this.http.post(this.walletBuyTrasactionAPI + '/'+ walletTransaction.fromWalletId + '/'+ walletTransaction.amount,
      walletTransaction, this.httpOptions).pipe(map(data => data))

    }
  }
}