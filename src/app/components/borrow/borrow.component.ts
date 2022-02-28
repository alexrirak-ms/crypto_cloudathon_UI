import { Component, OnInit, ViewChild } from "@angular/core";
import {CurrencyPipe} from "@angular/common";
import {BorrowApiService} from "../../services/index"
import {PopupComponent} from "../popup/popup.component"
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
	  { term: 'Total Loan', value: '$' },
	  { term: 'Interest Rate', value: '%' },
	  { term: 'Monthly Interest', value: '$' },
	  { term: 'Total Interest', value: '$' },
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

}