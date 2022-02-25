import { Component, OnInit, ViewChild } from "@angular/core";
import {CurrencyPipe} from "@angular/common";
import {PortfolioApiService} from "../../services/index"
import {PopupComponent} from "../popup/popup.component"
@Component({
	selector: "portfolio",
	templateUrl: "./portfolio.component.html",
	styleUrls: ["./portfolio.component.scss"],
	providers: [CurrencyPipe]
})
export class PortfolioComponent implements OnInit {
	@ViewChild( PopupComponent) private messageModal: PopupComponent;
	componentString: string = "";
	componentConfig: any = {};
	data: any = {};
	constructor(
	private PortfolioApiService: PortfolioApiService
	){}
	ngOnInit(){
		//Nothing for now
		this.PortfolioApiService.getPortfolioInitData(null).subscribe(
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