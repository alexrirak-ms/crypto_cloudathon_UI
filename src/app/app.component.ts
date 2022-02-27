import { Component, OnInit } from "@angular/core";
import {TabData } from "./models/index";
import {Router} from "@angular/router";
import { LocationStrategy, HashLocationStrategy, Location } from '@angular/common';
import { AuthApiService } from './services/index'

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
	private location: Location,
	private authService : AuthApiService
	){}
	async ngOnInit(){
		this.routeOnInit();
	}
	initUserLogin(userId: string, pw: string){
		this.authService.initUserAuth(userId, pw)
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
	//Should be used for local testing only
	fakeAuthenticate(){
		this.authService.userId = "abcde-123456-abcde-123456";
		this.authService.username = "alex";
		this.authService.loggedIn = true;
		
	}
	isUserAuthenticated(){
		//Eventually, this method will check for a valid auth cookie
		//If it exists, we try to authenticate with the server, set up authService, and return true based on that
		//Right now, we will always make the user log in first
		
		/****** NOTE: If you want to temporarily disable the login screen prompt, uncomment the below line of code
			  * It will fake-authenticate you automatically *******/
		
		//return new Promise((prom, rej) => {if (!rej){}; this.fakeAuthenticate(); return prom(true) })
		
		return new Promise((prom, rej) => {if (!rej){}; return prom(false)})
		


	}
	async routeOnInit(){
		let authenticated = await this.isUserAuthenticated();
		if (authenticated){
			//take the user to wherever they were loading the page to, or a default page if none are specified
			let path: string = this.location.path();
			if (path.includes("/")){
				let routeState = path.substring(1)
				if (routeState.includes("?")) routeState = routeState.split("?")[0]
				if (this.tabs.filter(q => q.routePath === routeState)){
					return this.router.navigate([routeState])
				}
			}
			else if (this.authService.redirectUrl){
				return this.router.navigate([this.authService.redirectUrl])
			}
			return this.router.navigate(['portfolio'])
		}
		//else, make the user log in
		return this.router.navigate(['login'])
	}


}