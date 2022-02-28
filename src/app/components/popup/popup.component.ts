import {Component, Input, OnInit} from "@angular/core";

//import * as $  from "jquery";
declare var $: any;

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
	sendPaymentModal: any;
	sendPaymentData :any;
	receivePaymentModal: any;
	receiveAddress: string;
	receiveBalance: number;
	name: string;
	paymentType: string;

	constructor() {
	}

	ngOnInit() {

	}

	resetModalTypes() {
		this.inputModal = false;
		this.standardModal = false;
		this.transactionWarningModal = false;
		this.instantPaymentModal = false;
		this.sendPaymentModal = false;
		this.receivePaymentModal = false;
	}

	showStandardModal(displayMessage: string, header: string = "Error") {
		this.resetModalTypes()
		this.message = displayMessage;
		this.headerMessage = (header || "Error")

		$("#popup-modal").modal("show")
	}

	showInputModal(name: string) {
		this.resetModalTypes()
		this.inputModal = true;
		this.name = name;
		$("#popup-modal").modal("show")
	}

	showTransactionWarningModal(receiveAddress:string, receiveBalance:number) {
		this.resetModalTypes()
		this.transactionWarningModal = true;
		this.receiveAddress = receiveAddress;
		this.receiveBalance = receiveBalance;
		$("#popup-modal").modal("show")
	}

	showInstantPaymentModalModal(paymentType: string, sendPaymentData:any = null) {
		this.resetModalTypes()
		this.instantPaymentModal = true;
		this.paymentType = paymentType;
		this.sendPaymentData = sendPaymentData;
		$("#popup-modal").modal("show")
	}

	showSendPaymentModal() {
		this.resetModalTypes()
		this.sendPaymentModal = true;
		$("#popup-modal").modal("show")
	}

	showReceivePaymentModal() {
		this.resetModalTypes()
		this.receivePaymentModal = true;
		$("#popup-modal").modal("show")
	}

	instantPaymentConfirm(paymentType: string) {
		if(paymentType == 'send') {
			this.showSendPaymentModal();
		} else if(paymentType == 'receive') {
			this.showReceivePaymentModal();
		}
	}

	//default
	show(displayMessage: string, header: string = "Error") {
		this.resetModalTypes()
		this.standardModal = true;
		this.message = displayMessage;
		this.headerMessage = (header || "Error")
		$("#popup-modal").modal("show")
	}

	close() {

		$("#popup-modal").modal("hide")
	}

}