import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {CurrencyPipe} from "@angular/common";
import {PortfolioApiService} from "../../services/index"
import {PopupComponent} from "../popup/popup.component"
import { GridApi} from 'ag-grid-community'
declare var $: any;
@Component({
	selector: "portfolio",
	templateUrl: "./portfolio.component.html",
	styleUrls: ["./portfolio.component.scss"],
	providers: [CurrencyPipe]
})
export class PortfolioComponent implements OnInit {
	@ViewChild( PopupComponent) private messageModal: PopupComponent;
	componentString: string = "";

	//@ts-ignore
	private allGridApi: GridApi;
	//@ts-ignore
	private walletsGridApi: GridApi;
	//@ts-ignore
	private rewardsGridApi: GridApi;
	componentConfig: any = {};
	rewardsData: any = [];
	accountData: any = [];
	selectedAssets: any = "All";
	allGridData: any = [];
	rewardsGridData: any = [];
	walletsGridData: any = [];
	rewardsGridInitialized: any = false;
	walletsGridInitialized: any = false;
	totalPortfolioValue: any = 0;

	public lineChartData: ChartDataSets[] = [
		{ data: [65.5, 59, 49, 52, 55, 60, 70.5], label: 'Series A' },
	  ];
	  public lineChartLabels: Label[] = ['6M', '5M', '4M', '3M', '2M', '1M', 'Today'];
	  //@ts-ignore
	  public lineChartOptions: (ChartOptions & { annotation: any }) = {
		responsive: false,
		maintainAspectRatio: false,
		legend:{
			display: false
		}
	  };
	  public lineChartColors: Color[] = [
		{
		  borderColor: 'black',
		  backgroundColor: 'rgba(80,200,80,0.3)',
		},
	  ];
	  public lineChartLegend = true;
	  public lineChartType = 'line';
	  public lineChartPlugins = [];



	constructor(
	private PortfolioApiService: PortfolioApiService
	){}
	changeAssetButton(assetType: string){
		this.selectedAssets = assetType;

	}
	changeDisplayedAssets(){
		//TODO


	}
	defaultColDef = {
		resizable: true,
		sortable: true,
		flex: 1
	};
	formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',

	  });

	columnDefs = [
		{headerName: 'Name', field: 'name'},
		{headerName: 'Wallet Balance', field: 'balance'},
		{headerName: 'Total Value', field: 'totalValue', cellRenderer:
		(param:any) =>{
			return this.formatter.format(param.data.totalValue)
		}},
		{headerName: 'Price', field: 'priceData', autoHeight: true,  cellRenderer:
		//@ts-ignore that I technically didn't define "param" as a type
		function(param){
			return param.data.formattedPriceData
			//return param.data.price + '<br/>' + param.data.change;
		  },
		 cellStyle: {'white-space': 'normal'}
		}
	];

	onAllGridReady(params: any) {
		this.allGridApi = params.api;
	}
	onWalletsGridReady(params: any) {
		this.walletsGridApi = params.api;
	}
	onRewardsGridReady(params: any) {
		this.rewardsGridApi = params.api;
	}


	//input: one of the rows of asset data
	//output: sets the "formattedPriceData" field with colors, formatting, etc

	formatPriceData(row: any){
		console.log(row)
		if (!row || !row.price) return; // || !row.change, eventually
		let format = ""
		let price = this.formatter.format(row.price);
		//@ts-ignore
		let change:Any = parseFloat(row.change).toFixed(2)
		let colorClass = ""
		if (change>0){
			colorClass = "color: darkgreen"
			change = "+" + change; //it's big brain time
		}
		else if (change < 0) colorClass = "color: darkred"
		change = change + "%"
		format = "<span>" + price + "</span><br/><span style='" + colorClass + "'>" + change + "</span>"
		row.formattedPriceData = format;

	}

	accountToAssetData(data: any){
		if (!data) return;
		let ret = []
		for (var d of data){
			let rowItem = {name: d.name + " (" + d.symbol + ")", balance: (parseFloat(d.balances.total_balance)/100000000).toFixed(4),
			price: parseFloat(30000 + Math.random()*10000+"").toFixed(2), change: parseFloat((Math.random()*10 - 5)+"").toFixed(2), totalValue: 0}
			//@ts-ignore that i'm putting floats into parse float oh no that's awful better refuse to compile
			rowItem.totalValue = parseFloat(rowItem.balance * rowItem.price).toFixed(2)
			this.totalPortfolioValue+=+rowItem.totalValue;
			ret.push(rowItem)
		}
		return ret;
	}
	rewardsToAssetData(data: any){
		if (!data) return;
		let ret = []
		for (var d of data){
			let rowItem = {name: d.Coin, balance: parseFloat(d.NumberCoins).toFixed(4), totalValue: parseFloat(d.ValueUSD).toFixed(2),
			change: parseFloat((Math.random()*10 - 5)+"").toFixed(2)}
			//@ts-ignore that i'm putting floats into parse float oh no that's awful better refuse to compile
			rowItem.price = parseFloat(rowItem.totalValue / rowItem.balance).toFixed(2)
			this.totalPortfolioValue+=+rowItem.totalValue;
			ret.push(rowItem)
		}
		return ret;
	}

	ngOnInit(){
		this.allGridData = [
			// {name: 'Chainlink (LINK)', balance: '10', price: "43.5", change: '+ 4.93 %'},
			// {name: 'NuCypher (NU)', balance:'100', price: "1.41", change: '+ 3.19 %'}
		];

		//Nothing for now
		this.PortfolioApiService.getPortfolioAccountData().subscribe(
			data => {
				console.log(data)
				this.accountData = data;
				this.walletsGridData = this.accountToAssetData(data);
				console.log(this.walletsGridData)
				for (var a of this.walletsGridData) {
					this.formatPriceData(a)
					this.allGridData.push(a)
				}
				this.walletsGridInitialized = true;
				//this.allGridApi.refreshCells();
				//this.allGridApi.redrawRows();
				//if (this.walletsGridApi) this.walletsGridApi.redrawRows();

			},
			error => {
				this.messageModal.show("An error has occured while pulling wallet data")
				console.log(error)
			}
		)
		this.PortfolioApiService.getPortfolioRewardsData().subscribe(
			data => {
				this.rewardsData = data;
				console.log(data)
				this.accountData = data;
				this.rewardsGridData = this.rewardsToAssetData(data);
				for (var a of this.rewardsGridData) {
					this.formatPriceData(a)
					this.allGridData.push(a)
				}
				this.rewardsGridInitialized = true;
				//this.allGridApi.redrawRows();
				//if (this.rewardsGridApi) this.rewardsGridApi.redrawRows();

			},
			error => {
				this.messageModal.show("An error has occured while pulling rewards data")
				console.log(error)
			}
		)
	}


}