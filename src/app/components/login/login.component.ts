import { Component, OnInit, ViewChild } from "@angular/core";
import {CurrencyPipe} from "@angular/common";
import {LoginApiService} from "../../services/index"
import {PopupComponent} from "../popup/popup.component"
@Component({
	selector: "login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
	providers: [CurrencyPipe]
})
export class LoginComponent implements OnInit {
	@ViewChild( PopupComponent) private messageModal: PopupComponent ;
	componentString: string = "";
	componentConfig: any = {};
	data: any = {};
	constructor(
	private LoginApiService: LoginApiService
	){}
	ngOnInit(){
		//Nothing for now
		this.LoginApiService.getLoginInitData(null).subscribe(
			data => {
				console.log(data)
				this.data = data;
			},
			error => {
				this.messageModal.show("Error occured while pulling Login data")
				console.log(error)
			}
		)
	}

}