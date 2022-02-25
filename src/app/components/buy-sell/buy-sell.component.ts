import { Component, OnInit, ViewChild } from "@angular/core";
import {CurrencyPipe} from "@angular/common";
import {BuySellApiService} from "../../services/index"
import {PopupComponent} from "../popup/popup.component"
@Component({
	selector: "buy-sell",
	templateUrl: "./buy-sell.component.html",
	styleUrls: ["./buy-sell.component.scss"],
	providers: [CurrencyPipe]
})
export class BuySellComponent implements OnInit {
	@ViewChild( PopupComponent) private messageModal: PopupComponent;
	componentString: string = "";
	componentConfig: any = {};
	data: any = {};
	constructor(
	private BuySellApiService: BuySellApiService
	){}
	ngOnInit(){
		//Nothing for now
		this.BuySellApiService.getBuySellInitData(null).subscribe(
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