import { Component, OnInit, ViewChild } from "@angular/core";
import {CurrencyPipe} from "@angular/common";
import {BorrowApiService} from "../../services/index"
import {PopupComponent} from "../popup/popup.component"
import { NgForm } from "@angular/forms";
//import { AgGridModule } from 'ag-grid-angular';
@Component({
	selector: "borrow",
	templateUrl: "./borrow.component.html",
	styleUrls: ["./borrow.component.scss"],
	providers: [CurrencyPipe]
})
export class BorrowComponent implements OnInit {

	columnDefs = [{ field: 'term' }, { field: 'value' }];

	rowData = [
	  { term: 'Total Loan', value: '$1000' },
	  { term: 'Interest Rate', value: '9.5%' },
	  { term: 'Monthly Interest', value: '$7.5' },
	  { term: 'Total Interest', value: '$180' },
	];
	@ViewChild( PopupComponent) private messageModal: PopupComponent ;
	componentString: string = "";
	componentConfig: any = {};
	data: any = {};
	constructor(
	private BorrowApiService: BorrowApiService
	){}
	ngOnInit(){
		//Nothing for now
		this.BorrowApiService.getBorrowInitData(null).subscribe(
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

	onRequestLoan(it: NgForm) {

		console.log(it);
	}

}