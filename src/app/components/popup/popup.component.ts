import { Component, OnInit, Input } from "@angular/core";
//import * as $  from "jquery";
//declare var $ : any;

@Component({
	selector: "popup",
	templateUrl: "./popup.component.html",
	styleUrls: ["./popup.component.scss"],
})
export class PopupComponent implements OnInit {
	@Input() message: string = "";
	@Input() headerMessage: string = "Error";

	constructor(){}

	ngOnInit(){

	}
	show(displayMessage: string, header: string = "Error"){
		this.message = displayMessage;
		this.headerMessage = (header || "Error")
		// @ts-ignore
		$("#popup-modal").modal("show") //it's a long story
	}
	close(){
		// @ts-ignore
		$("#popup-modal").modal("hide")
	}

}