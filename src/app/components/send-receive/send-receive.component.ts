import { Component, OnInit, ViewChild } from "@angular/core";
import {CurrencyPipe} from "@angular/common";
import {SendReceiveApiService} from "../../services/index"
import {PopupComponent} from "../popup/popup.component"
@Component({
	selector: "send-receive",
	templateUrl: "./send-receive.component.html",
	styleUrls: ["./send-receive.component.scss"],
	providers: [CurrencyPipe]
})
export class SendReceiveComponent implements OnInit {
	@ViewChild( PopupComponent) private messageModal: PopupComponent;
	componentString: string = "";
	componentConfig: any = {};
	data: any = {};
	constructor(
	private SendReceiveApiService: SendReceiveApiService
	){}
	ngOnInit(){
		//Nothing for now
		this.SendReceiveApiService.getSendReceiveInitData(null).subscribe(
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