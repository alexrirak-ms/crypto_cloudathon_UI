import { Component, OnInit, ViewChild } from "@angular/core";
import {CurrencyPipe} from "@angular/common";
import {BuySellApiService} from "../../services/index"
import {PopupComponent} from "../popup/popup.component"
import { BuySellTransaction } from '../../models/buyselltransaction';

@Component({
	selector: "buy-sell",
	templateUrl: "./buy-sell.component.html",
	styleUrls: ["./buy-sell.component.scss"],
	providers: [CurrencyPipe]
})

export class BuySellComponent implements OnInit {
	buySellTransaction: BuySellTransaction | undefined;
	isTransactionSubmitted: boolean;
	isTransactionSubmissionSuccess: boolean;
	isTransactionSubmissionError: boolean;
	isCurrencyBitcoin: boolean;
	amount: string;
	bitcoinUSDPrice:any;

	@ViewChild( PopupComponent) private messageModal: PopupComponent;
	componentString: string = "";
	componentConfig: any = {};
	data: any = {};

	constructor(
		private buySellApiService: BuySellApiService
	){}

	ngOnInit(){
		this.isTransactionSubmitted = false;		
		this.buySellApiService.getBitcoinUSDValue().subscribe(
			data => {
				console.log(`Getting successful conversion API response: ${data}`);
				this.bitcoinUSDPrice = Math.round(data.usdPrice);
				console.log(`Current bitcoin USD value: ${this.bitcoinUSDPrice}`);
			},
			error => {
				this.messageModal.show("Error occured while calling conversion API")
				console.log(error)
			}
		)
	}

	columnDefs = [
		{headerName: 'Name', field: 'name'},
		{headerName: 'Price', field: 'price'},
		{headerName: 'Change', field: 'change'}
	];
	rowData = [
		{name: 'Chainlink (LINK)', price: '$170', change: '+ 4.93 %'},
		{name: 'NuCypher (NU)', price: '$0.55', change: '+ 3.19 %'}
	];

	defaultColDef = {
		resizable: true,
		sortable: true,
		flex: 1
	};
 	
	switchCurrency() {
		console.log(`this.isCurrencyBitcoin: ${this.isCurrencyBitcoin}"`);
		this.isCurrencyBitcoin = !this.isCurrencyBitcoin;
	}

	async confirmTransaction(purchaseFrequency:string, transactionType:string) {
		var amount = this.amount;
		try{
			(await this.buySellApiService.executeTransaction({ purchaseFrequency, transactionType, amount } as BuySellTransaction, 
				this.isCurrencyBitcoin, this.bitcoinUSDPrice))
			  .subscribe(
				//@ts-ignore
				data => {
					console.log(`Getting successful transaction API response: ${data}`);
					this.data = data;
					this.isTransactionSubmitted = true;
					this.isTransactionSubmissionSuccess = true;
					this.isTransactionSubmissionError = false;
				},
							//@ts-ignore
	
				error => {
					console.log(`Getting error response from transaction API: "${error}"`);
					this.isTransactionSubmitted = true;
					this.isTransactionSubmissionSuccess = false;
					this.isTransactionSubmissionError = true;
					this.messageModal.show("Error occured while processing transation")
					console.log(error)
				}
			)
		}
		catch(e){
			console.log(`Getting error response from transaction API: "${e}"`);
					this.isTransactionSubmitted = true;
					this.isTransactionSubmissionSuccess = false;
					this.isTransactionSubmissionError = true;
					this.messageModal.show("Error occured while processing transation")
					console.log(e)
		}
		
	}
}