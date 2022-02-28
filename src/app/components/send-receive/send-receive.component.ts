import {Component, OnInit, ViewChild} from "@angular/core";
import {CurrencyPipe} from "@angular/common";
import {SendReceiveApiService} from "../../services/index"
import {PopupComponent} from "../popup/popup.component"
import {GridApi, GridReadyEvent} from "ag-grid-community";

declare var $: any;

@Component({
	selector: "send-receive",
	templateUrl: "./send-receive.component.html",
	styleUrls: ["./send-receive.component.scss"],
	providers: [CurrencyPipe]
})
export class SendReceiveComponent implements OnInit {
	@ViewChild(PopupComponent) messageModal: PopupComponent;
	data: any = [];
	rowData:any;
	currencyInBTC:boolean = false;
	btcUsdRate:number;
	private gridApi!: GridApi;
	columnDefs = [
		{headerName: 'Name', field: 'name'},
		{headerName: 'Balance', field: 'balance'},
		{headerName: 'USD Balance', field: 'usd_balance', valueFormatter: (params: any) => this.currencyFormatter(params.data.usd_balance, '$')}
	];

	constructor(private SendReceiveApiService: SendReceiveApiService) {

	}

	ngOnInit() {
		this.SendReceiveApiService.getSendReceiveInitData(this.SendReceiveApiService.getUserToken()['user_id']).subscribe(
			data => {
				this.data = data;
				console.log(data);

				this.data.forEach((value: any) => {
					if (!this.rowData) {this.rowData = []}

					this.SendReceiveApiService.getCoinValue(value['symbol']).subscribe(
						usd_value => {
							var balance: number = value['balances']['total_balance'] / 100000000

							// No idea what's going on with the cast here, typescript and I are not friends
							var usd_balance: number = balance * <number><unknown>usd_value['usdPrice' as keyof typeof usd_value];
							// push in the new row
							this.rowData.push({name: value['name'], balance: balance + " " + value['symbol'].toUpperCase(), usd_balance: usd_balance})
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
		this.SendReceiveApiService.getCoinValue('btc').subscribe(
			data => {
				this.btcUsdRate= <number><unknown>data['usdPrice' as keyof typeof data];
			}
		)

	}

	onGridReady(params: GridReadyEvent) {
		this.gridApi = params.api;
	}

	defaultColDef = {
		resizable: true,
		sortable: true,
		flex: 1
	};

	currencyFormatter(currency: number, sign: string) {
	  var sansDec = currency.toFixed(0);
	  var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	  return sign + `${formatted}`;
	}

	switchInputType() {
	  this.currencyInBTC = !this.currencyInBTC;
	}

	sendPayment() {
		var coin_amount = 0;
		var usd_amount = 0;
		var symbol = "BTC";

		if (this.currencyInBTC) {
			coin_amount = $("#amountBTC").val() * 100000000;
			usd_amount = <number><unknown>($("#amountBTC").val() * this.btcUsdRate).toFixed(2);
		} else {
			usd_amount = $("#amountUSD").val();
			coin_amount = <number><unknown>($("#amountUSD").val() / this.btcUsdRate).toFixed(6) * 100000000;
			console.log(usd_amount, this.btcUsdRate);
		}
		this.messageModal.showInstantPaymentModalModal('send', {
			"usdAmount": usd_amount,
			"coinAmount": coin_amount,
			"toAddress": $("#toAddress").val(),
			"symbol":symbol
		})
	}

}