import {Component, OnInit, ViewChild} from "@angular/core";
import {CurrencyPipe} from "@angular/common";
import {SendReceiveApiService} from "../../services/index"
import {PopupComponent} from "../popup/popup.component"
import {GridApi, GridReadyEvent} from "ag-grid-community";

@Component({
	selector: "send-receive",
	templateUrl: "./send-receive.component.html",
	styleUrls: ["./send-receive.component.scss"],
	providers: [CurrencyPipe]
})
export class SendReceiveComponent implements OnInit {
	@ViewChild(PopupComponent) private messageModal: PopupComponent;
	componentString: string = "";
	componentConfig: any = {};
	data: any = [];
	rowData:any;
	private gridApi!: GridApi;
	columnDefs = [
		{headerName: 'Name', field: 'name'},
		{headerName: 'Balance', field: 'balance'},
		{headerName: 'USD Balance', field: 'usd_balance', valueFormatter: params => this.currencyFormatter(params.data.usd_balance, '$')}
	];

	constructor(private SendReceiveApiService: SendReceiveApiService) {

	}

	ngOnInit() {
		//Nothing for now
		//TODO: this user id should not be hardcoded
		this.SendReceiveApiService.getSendReceiveInitData("e16666ff-c559-4aab-96eb-f0a5c2c77b18").subscribe(
			data => {
				console.log(data);
				this.data = data;

				this.data.forEach((value: any) => {
					if (!this.rowData) {this.rowData = []}

					this.SendReceiveApiService.getCoinValue(value['symbol']).subscribe(
						usd_value => {
							var balance = value['balances']['total_balance'] / 100000000

							// push in the new row
							this.rowData.push({name: value['name'], balance: balance + " " + value['symbol'].toUpperCase(), usd_balance: balance * usd_value})
							//redraw rows so that the grid reloads
							this.gridApi.setRowData(this.rowData);
						}
					)

				})
			},
			error => {
				this.messageModal.show("Error occurred while pulling asset data")
				console.log(error);
			}
		);

	}

	onGridReady(params: GridReadyEvent) {
		this.gridApi = params.api;
	}

	defaultColDef = {
		resizable: true,
		sortable: true,
		flex: 1
	};

	currencyFormatter(currency, sign) {
	  var sansDec = currency.toFixed(0);
	  var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	  return sign + `${formatted}`;
	}

}