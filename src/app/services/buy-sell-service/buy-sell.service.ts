import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {  map  } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BuySellTransaction } from '../../models/buyselltransaction';
import { WalletFundTransaction } from '../../models/walletfundtransaction';
import { WalletSellTransaction } from '../../models/walletselltransaction';


@Injectable()
export class BuySellApiService {

  private walletSellTransactionAPI = 'http://crypto-banksters-wallet-api.azurewebsites.net/transaction';
  private walletFundTransactionAPI = 'http://crypto-banksters-wallet-api.azurewebsites.net/transaction/fund';
  private coinUSDConversionAPI = 'http://crypto-banksters-wallet-api.azurewebsites.net/conversions/usd-value/bcy';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }
    
  getBitcoinUSDValue() : Observable<any> {
    console.log('Getting current bitcoin value from conversion API:');
    return this.http.get(this.coinUSDConversionAPI).pipe(map(data => data))    
  }

  executeTransaction(buySelltransaction: BuySellTransaction, isCurrencyBitcoin: boolean, bitcoinUSDPrice:any): Observable<any> {
    console.log('Transaction Type:' + buySelltransaction.transactionType);
    if(buySelltransaction.transactionType == 'sell') {
      if(isCurrencyBitcoin) {
        console.log(`Selling bitcoins with total number: "${buySelltransaction.amount }"`);

        const walletSellTransaction: WalletSellTransaction = {
          fromWalletId: 'cd6076fc-e4bc-4f34-800b-1fdf8c64e884',        
          toAddress: 'BSCBSiUzqnTQgnHrSejfg5ac1syQewExGw',
          amount: parseInt(buySelltransaction.amount) * 100000000
        };

        console.log(`Amount of bitcoins in satoshi to be sold: ${walletSellTransaction.amount}`);
        return this.http.put(this.walletSellTransactionAPI, walletSellTransaction, this.httpOptions).pipe(map(data => data))
      }
      else {
        console.log(`Selling $ with total number: ${buySelltransaction.amount }`);
        var satoshiAmount = (Math.round(parseInt(buySelltransaction.amount) * 100000000/bitcoinUSDPrice)/100000000)* 100000000;

        console.log(`satoshiAmount: ${satoshiAmount}`);

        const walletSellTransaction: WalletSellTransaction = {
          fromWalletId: 'cd6076fc-e4bc-4f34-800b-1fdf8c64e884',        
          toAddress: 'BSCBSiUzqnTQgnHrSejfg5ac1syQewExGw',
          amount: satoshiAmount
        };

        console.log(`Amount of $ in satoshi to be sold:"${walletSellTransaction.amount}"`);

        return this.http.put(this.walletSellTransactionAPI, walletSellTransaction, this.httpOptions).pipe(map(data => data));
      } 
    }
    else {
      if(isCurrencyBitcoin) {
        console.log(`Buying bitcoins with total number: ${buySelltransaction.amount }`);
        // getting Satoshi amount
        var satoshiAmount = parseInt(buySelltransaction.amount) * 100000000;

        console.log(`satoshiAmount: "${satoshiAmount}"`);

        const walletFundTransaction: WalletFundTransaction = {
          // hardcoding values
          fromWalletId: 'cd6076fc-e4bc-4f34-800b-1fdf8c64e884', 
          toAddress: 'BSCBSiUzqnTQgnHrSejfg5ac1syQewExGw',
          amount: satoshiAmount.toString()
        };

        return this.http.post(this.walletFundTransactionAPI + '/'+ walletFundTransaction.fromWalletId + '/'+ walletFundTransaction.amount,
          walletFundTransaction, this.httpOptions).pipe(map(data => data))
      }
      else {
        console.log(`Buying bitcoins for $ amount: ${buySelltransaction.amount }`);
        console.log(`1 bitcoin USD price: ${bitcoinUSDPrice}`);
        
        var satoshiAmount = (Math.round(parseInt(buySelltransaction.amount) * 100000000/bitcoinUSDPrice)/100000000)* 100000000;

        console.log(`satoshiAmount: ${satoshiAmount}`);

        const walletFundTransaction: WalletFundTransaction = {
          // hardcoding values
          fromWalletId: 'cd6076fc-e4bc-4f34-800b-1fdf8c64e884', 
          toAddress: 'BSCBSiUzqnTQgnHrSejfg5ac1syQewExGw',
          amount: satoshiAmount.toString() 
        };

        return this.http.post(this.walletFundTransactionAPI + '/'+ walletFundTransaction.fromWalletId + '/'+ walletFundTransaction.amount,
          walletFundTransaction, this.httpOptions).pipe(map(data => data))       
      }
    }
  }
}