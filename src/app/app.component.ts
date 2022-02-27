import { Component, OnInit } from "@angular/core";
import {TabData } from "./models/index";
import {Router} from "@angular/router";
import { LocationStrategy, HashLocationStrategy, Location } from '@angular/common';
//import * as Highcharts from 'highcharts';
@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
	providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppComponent implements OnInit {
	title = "CryptoBanksters";
	selectedTab: string = "";
	tabs: any[] = [];
	constructor(
	private router: Router,
	private location: Location
	){}
	ngOnInit(){
		this.routeOnInit()
	}
	initTabs(){
		this.tabs.push(new TabData('portfolio', 'Portfolio'))
		this.tabs.push(new TabData('earnRewards', 'Earn Rewards'))
		this.tabs.push(new TabData('buySell', 'Buy & Sell'))
		this.tabs.push(new TabData('sendReceive', 'Send & Receive'))
		this.tabs.push(new TabData('borrow', 'Borrow'))
		this.tabs.push(new TabData('login', 'Login'))
	}
	
	tabSwitch(tab: string){
		this.selectedTab = tab;
	}
	selectTab(tab: TabData){
		this.selectedTab = tab.label;
	}
	isSelectedTab(tab: string){
		return this.selectedTab == tab;
	}
	routeOnInit(){
		let path: string = this.location.path();
		if (path.includes("/")){
			let routeState = path.substring(1)
			if (routeState.includes("?")) routeState = routeState.split("?")[0]
			if (this.tabs.filter(q => q.routePath === routeState)){
				return this.router.navigate([routeState])
			}
		}
		return this.router.navigate(['portfolio'])
	}


}