import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
//import { AREAS_ROUTES } from "./areas/index";
import{
	PortfolioComponent,
	BuySellComponent,
	BorrowComponent,
	SendReceiveComponent,
	//PopupComponent,
	EarnRewardsComponent
	
} from './components/index'
const routes : Routes = [
	{
		path: 'portfolio',
		component: PortfolioComponent
	},
	{
		path: 'earnRewards',
		component: EarnRewardsComponent
	},
	{
		path: 'buySell',
		component: BuySellComponent
	},
	{
		path: 'sendReceive',
		component: SendReceiveComponent
	},
	{
		path: 'borrow',
		component: BorrowComponent
	},
	
]
@NgModule({
	imports: [RouterModule.forRoot(routes, {useHash: true})],
	exports: [RouterModule],
})
export class AppRoutingModule {}
