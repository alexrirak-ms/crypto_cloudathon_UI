import { Component, OnInit, ViewChild } from "@angular/core";
import {CurrencyPipe} from "@angular/common";
import {RewardsApiService} from "../../services/index"
import {PopupComponent} from "../popup/popup.component"
@Component({
	selector: "earn-rewards",
	templateUrl: "./earn-rewards.component.html",
	styleUrls: ["./earn-rewards.component.scss"],
	providers: [CurrencyPipe]
})
export class EarnRewardsComponent implements OnInit {
	@ViewChild( PopupComponent) private messageModal: PopupComponent;
	componentString: string = "";
	componentConfig: any = {};
	data: any = {};
	rowData:any;


	isTransactionSubmitted: boolean;
	isTransactionSubmissionSuccess: boolean;
	isTransactionSubmissionError: boolean;
	
	columnDefs = [
		{headerName: 'Coin', field: 'Coin'},
		{headerName: 'Number of Coins', field: 'NumberCoins'},
		{headerName: 'Value in USD', field: 'ValueUSD'}
	];
	constructor(
	private RewardsApiService: RewardsApiService
	){}
	ngOnInit(){
		//Nothing for now
		this.RewardsApiService.getRewardsInitData('e16666ff-c559-4aab-96eb-f0a5c2c77b18').subscribe(
			data => {
				console.log(data);
				this.data = data;

				this.data.forEach((value: any) => {
					if (!this.rowData) {this.rowData = []}
					this.rowData.push({Coin: value['Coin'], NumberCoins: value['NumberCoins'], ValueUSD: "$" + value['ValueUSD']})

				})
			},
			error => {
				this.messageModal.show("Error occurred while pulling asset data")
				console.log(error);
			}
		);
	}

	confirmTransaction(currencyAmount: any, Currency: any, accountFromTo: any): void {
		this.RewardsApiService.executeTransaction(currencyAmount, Currency, accountFromTo)
		  .subscribe(
			data => {
				
				// console.log("THIS IS A TEST " + currencyAmount + " " + Currency + " " + accountFromTo);
				console.log(`Getting successful response with data: "${data}"`);
				
			},
			error => {
				console.log(error + currencyAmount)
			}
		);
		this.RewardsApiService.getRewardsInitData('e16666ff-c559-4aab-96eb-f0a5c2c77b18').subscribe(
			data => {
				console.log(data);
				this.data = data;

				console.log("TEST");
				this.data.forEach((value: any) => {
					this.rowData = []
					this.rowData.push({Coin: value['Coin'], NumberCoins: value['NumberCoins'], ValueUSD: "$" + value['ValueUSD']})
					console.log(value['NumberCoins']);
					this.isTransactionSubmissionSuccess = true;

				})
			},
			error => {
				this.messageModal.show("Error occurred while pulling asset data")
				console.log(error);
			}
		);	
	}
	

}