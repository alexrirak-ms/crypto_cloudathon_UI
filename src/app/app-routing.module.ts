import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserLoggedInGuard } from './guards/user-loggedin.guard'
import { NoLoginGuard } from './guards/no-login.guard'

//import { AREAS_ROUTES } from "./areas/index";
import{
	PortfolioComponent,
	BuySellComponent,
	BorrowComponent,
	SendReceiveComponent,
	LoginComponent,
	//PopupComponent,
	EarnRewardsComponent,
	 	
} from './components/index'
const routes : Routes = [
	{
		path: 'portfolio',
		component: PortfolioComponent,
		canActivate: [UserLoggedInGuard]
	},
	{
		path: 'earnRewards',
		component: EarnRewardsComponent,
		canActivate: [UserLoggedInGuard]
	},
	{
		path: 'buySell',
		component: BuySellComponent,
		canActivate: [UserLoggedInGuard]
	},
	{
		path: 'sendReceive',
		component: SendReceiveComponent,
		canActivate: [UserLoggedInGuard]
	},
	{
		path: 'borrow',
		component: BorrowComponent,
		canActivate: [UserLoggedInGuard]
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [NoLoginGuard]
	},

	
]
@NgModule({
	imports: [RouterModule.forRoot(routes, {useHash: true})],
	exports: [RouterModule],
})
export class AppRoutingModule {}
