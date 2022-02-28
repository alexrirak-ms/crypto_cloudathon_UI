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
		this.RewardsApiService.getRewardsInitData('4aa9777c-f2e9-4812-9270-5f3b4c178d89').subscribe(
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

	confirmTransaction(currencyAmount: any): void {
		this.RewardsApiService.executeTransaction(currencyAmount)
		  .subscribe(
			data => {
				
				console.log(`Getting successful response with data: "${data}"`);
				console.log("CAKE");
			},
			error => {
				console.log(error + currencyAmount)
			}
		);
		this.RewardsApiService.getRewardsInitData('4aa9777c-f2e9-4812-9270-5f3b4c178d89').subscribe(
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

}