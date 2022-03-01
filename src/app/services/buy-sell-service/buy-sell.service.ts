import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {  map  } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { BuySellTransaction } from '../../models/buyselltransaction';
import { WalletFundTransaction } from '../../models/walletfundtransaction';
import { WalletSellTransaction } from '../../models/walletselltransaction';
import { AuthApiService } from '..';

@Injectable()
export class BuySellApiService {

  private walletSellTransactionAPI = 'https://crypto-banksters-wallet-api.azurewebsites.net/transaction';
  private walletFundTransactionAPI = 'https://crypto-banksters-wallet-api.azurewebsites.net/transaction/fund';
  private coinUSDConversionAPI = 'https://crypto-banksters-wallet-api.azurewebsites.net/conversions/usd-value/bcy';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private authApiService: AuthApiService
  ) { }
  getHouseWallet(){

  }

  getUserWallets(symbol: string, prom: any, rej: any){
    let userId = this.authApiService.getUserToken();
    this.http.get("https://crypto-banksters-wallet-api.azurewebsites.net/wallets/user/" + userId).subscribe(data => {
      if (!rej){}
      try{
        //@ts-ignore
        let d = data.filter(q => q.symbol === symbol)[0]
        return prom(d.wallet_id)
      }
      catch(e){
        console.log(data)
        console.log("Unable to find wallet with symbol " + symbol)
        return prom(null)
      }
    }, err => {console.log(err); return prom(null)})
  }


  getBitcoinUSDValue() : Observable<any> {
    console.log('Getting current bitcoin value from conversion API:');
    return this.http.get(this.coinUSDConversionAPI).pipe(map(data => data))
  }

  async executeTransaction(buySelltransaction: BuySellTransaction, isCurrencyBitcoin: boolean, bitcoinUSDPrice:any): Promise<Observable<any>> {
    var promise = new Promise<string>((prom, rej) => this.getUserWallets("BCY", prom, rej));
    var fromWallet = await promise;
    if (!fromWallet){
      console.log("FromWalletId not found. shut it down")
      throw throwError("Wallet not found");
    }
    console.log('Transaction Type:' + buySelltransaction.transactionType);
    if(buySelltransaction.transactionType == 'sell') {
      if(isCurrencyBitcoin) {
        console.log(`Selling bitcoins with total number: "${buySelltransaction.amount }"`);

        const walletSellTransaction: WalletSellTransaction = {
          fromWalletId: fromWallet,
          toAddress: 'CBxNVXJx1FEHRHLbbDYAngkUbHwfSCinw1',
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
          fromWalletId: fromWallet,
          toAddress: 'CBxNVXJx1FEHRHLbbDYAngkUbHwfSCinw1',
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
          fromWalletId: fromWallet,
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
          fromWalletId: fromWallet,
          toAddress: 'BSCBSiUzqnTQgnHrSejfg5ac1syQewExGw',
          amount: satoshiAmount.toString()
        };

        return this.http.post(this.walletFundTransactionAPI + '/'+ walletFundTransaction.fromWalletId + '/'+ walletFundTransaction.amount,
          walletFundTransaction, this.httpOptions).pipe(map(data => data))
      }
    }
  }
}