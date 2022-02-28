import { Component, OnInit, ViewChild } from "@angular/core";
import {CurrencyPipe} from "@angular/common";
import {RewardsApiService} from "../../services/index"
import {PopupComponent} from "../popup/popup.component"
@Component({
	selector: "accounts",
	templateUrl: "./accounts.component.html",
	styleUrls: ["./accounts.component.scss"],
	providers: [CurrencyPipe]
})
export class AccountsComponent implements OnInit {
	@ViewChild( PopupComponent) private messageModal: PopupComponent;
	componentString: string = "";
	componentConfig: any = {};
	data: any = {};
	constructor(
	private RewardsApiService: RewardsApiService
	){}
	ngOnInit(){
		//Nothing for now
		this.RewardsApiService.getRewardsInitData(null).subscribe(
			data => {
				console.log(data)
				this.data = data;
			},
			error => {
				this.messageModal.show("Error occured while pulling Borrow data")
				console.log(error)
			}
		)
	}

}