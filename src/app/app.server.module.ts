import { NgModule } from "@angular/core";
import { ServerModule, ServerTransferStateModule } from "@angular/platform-server";
import { ChartsModule } from 'ng2-charts';
import { AppModule } from "./app.module";
import { AppComponent } from "./app.component";

@NgModule({
	imports: [
		ServerTransferStateModule,
		AppModule,
		ServerModule,
		ChartsModule
	],
	bootstrap: [AppComponent],
})
export class AppServerModule { }
