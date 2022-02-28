import { Component, OnInit, Input } from "@angular/core";

//import * as $  from "jquery";
declare var $ : any;

@Component({
	selector: "popup",
	templateUrl: "./popup.component.html",
	styleUrls: ["./popup.component.scss"],
})
export class PopupComponent implements OnInit {
	@Input() message: string = "";
	@Input() headerMessage: string = "Error";
	standardModal: any;
	inputModal: any;
	transactionWarningModal: any;
	instantPaymentModal: any;
	name: string;
	paymentType: string;
	constructor(){}

	ngOnInit(){

	}

	showStandardModal(displayMessage: string,  header: string = "Error" ){
		this.resetModalTypes()
		this.message = displayMessage;
		this.headerMessage = (header || "Error")

		$("#popup-modal").modal("show")
	}
	resetModalTypes(){
		this.inputModal = false;
		this.standardModal = false;
		this.transactionWarningModal = false;
		this.instantPaymentModal = false;
	}
	showInputModal(name: string){
		this.resetModalTypes()
		this.inputModal = true;
		this.name = name;
		$("#popup-modal").modal("show")
	}
	showTransactionWarningModal(){
		this.resetModalTypes()
		this.transactionWarningModal = true;
		$("#popup-modal").modal("show")
	}
	showInstantPaymentModalModal(paymentType: string){
		this.resetModalTypes()
		this.instantPaymentModal = true;
		this.paymentType = paymentType;
		$("#popup-modal").modal("show")
	}

	//default
	show(displayMessage: string, header: string = "Error"){
		this.resetModalTypes()
		this.message = displayMessage;
		this.headerMessage = (header || "Error")

		$("#popup-modal").modal("show")
	}
	close(){

		$("#popup-modal").modal("hide")
	}

}