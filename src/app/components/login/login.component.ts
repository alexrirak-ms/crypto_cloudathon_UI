import { Component, OnInit } from "@angular/core";
import {CurrencyPipe} from "@angular/common";
import {LoginApiService} from "../../services/index"
import { Router } from '@angular/router';
import { NgForm} from "@angular/forms";
@Component({
	selector: "login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
	providers: [CurrencyPipe]
})
export class LoginComponent implements OnInit {

	//@ViewChild( PopupComponent) private messageModal: PopupComponent ;
	componentString: string = "";
	componentConfig: any = {};
	data: any = {};
	username: String;
	password: String;

	constructor(private LoginApiService: LoginApiService,
		private router: Router){}
	ngOnInit(){

	}

	onLoginSubmit(inputs: NgForm){
	
		const user = {
		  username :inputs.value.username,
		  password :inputs.value.password
		}
		this.LoginApiService.authenticateUser(user).subscribe(data => {
			console.log(data);
			if (data.success) {
				this.LoginApiService.storeUserData(data.user);
				//pop up message
				this.router.navigate(['portfolio']);
	  
			}else {
			  //pop up message
			  this.router.navigate(['login']);
		  }
		  });
	}

}