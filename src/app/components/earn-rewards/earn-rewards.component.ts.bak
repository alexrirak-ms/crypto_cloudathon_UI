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

	@ViewChild( PopupComponent) private messageModal: PopupComponent;
	componentString: string = "";
	componentConfig: any = {};
	data: any = {};

	constructor(
		private buySellApiService: BuySellApiService
	){}

	ngOnInit(){
		this.isTransactionSubmitted = false;
		// will be getting watch list if API is available
		// this.buySellApiService.getBuySellInitData(null).subscribe(
		// 	data => {
		// 		console.log(data)
		// 		this.data = data;
		// 	},
		// 	error => {
		// 		this.messageModal.show("Error occured while pulling Borrow data")
		// 		console.log(error)
		// 	}
		// )
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
 	
	confirmTransaction(purchaseFrequency:string, transactionType:string, currencyAmount:string, bitcoinAmount:string): void {
		this.buySellApiService.executeTransaction({ purchaseFrequency, transactionType, currencyAmount, bitcoinAmount } as BuySellTransaction)
		  .subscribe(
			data => {
				console.log(`Getting successful response with data: "${data}"`);
				this.data = data;
				this.isTransactionSubmitted = true;
				this.isTransactionSubmissionSuccess = true;
				this.isTransactionSubmissionError = false;
			},
			error => {
				console.log(`Getting error response: "${error}"`);
				this.isTransactionSubmitted = true;
				this.isTransactionSubmissionSuccess = false;
				this.isTransactionSubmissionError = true;
				this.messageModal.show("Error occured while processing transation")
				console.log(error)
			}
		)
	}
}