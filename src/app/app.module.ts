import { BrowserModule, BrowserTransferStateModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ServiceWorkerModule } from "@angular/service-worker";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AREAS_COMPONENTS } from "./areas/index";
import { AppSharedModule } from "./shared";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BuySellComponent, SendReceiveComponent, PopupComponent, PortfolioComponent,EarnRewardsComponent, BorrowComponent } from "./components/index"
import { BuySellApiService, SendReceiveApiService, PortfolioApiService, RewardsApiService, BorrowApiService } from './services/index'
//import { HighchartsChartModule } from 'highcharts-angular';
@NgModule({
	declarations: [AppComponent, 
		BuySellComponent,
		SendReceiveComponent,
		PortfolioComponent,
		EarnRewardsComponent,
		BorrowComponent,
		PopupComponent,	
		...AREAS_COMPONENTS],
	imports: [
		// vendors
		BrowserModule.withServerTransition({ appId: "serverApp" }),
		FormsModule,
		HttpClientModule,
		ServiceWorkerModule.register("/ngsw-worker.js", { enabled: environment.production }),
		BrowserTransferStateModule,
		//HighchartsChartModule,

		// app
		AppSharedModule,
		AppRoutingModule,
		NoopAnimationsModule,
	],
	providers: [
		PortfolioApiService,
		BuySellApiService,
		SendReceiveApiService,
		RewardsApiService,
		BorrowApiService
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
