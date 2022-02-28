import { Component, OnInit, ViewChild } from "@angular/core";
import {CurrencyPipe} from "@angular/common";
import { AuthApiService } from "../../services/index"
import {Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {PopupComponent} from "../popup/popup.component"
@Component({
	selector: "login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
	providers: [CurrencyPipe]
})
export class LoginComponent implements OnInit {
	// @ts-ignore
	@ViewChild( PopupComponent) private messageModal: PopupComponent ;
	componentString: string = "";
	componentConfig: any = {};
	submitted = false;
	loginContainer: FormGroup;
	loggingIn = false;
	UNKNOWN_ERROR_STR: string = "An unknown error occured while logging in. Please try again.";
	data: any = {};

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private AuthApiService: AuthApiService
	){}
	ngOnInit(){
		if (this.AuthApiService.loggedIn){
			//Already logged in - navigate away from the login page
			return this.router.navigate(['portfolio'])
		}
		this.loginContainer = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

	}
	showErrorLogin(message: string){
		this.messageModal.show(message, "Login Error")
	}
	
	async login(){
		let username = this.loginContainer.controls.username.value;
		let password = this.loginContainer.controls.password.value;
		this.loggingIn = true;
		this.submitted = true;
		if (this.loginContainer.invalid) {
			return this.loggingIn = false;
        }
		let promise = this.AuthApiService.initUserAuth(username, password)
		try{
			let result = await promise;
			if (!result) {
				this.showErrorLogin(this.UNKNOWN_ERROR_STR)
				this.loggingIn = false;
				return;
			}
			if (result && result.status && result.status === 1){
				console.log(this.AuthApiService.redirectUrl)
				if (this.AuthApiService.redirectUrl){
					return this.router.navigate([this.AuthApiService.redirectUrl])
				}
				return this.router.navigate(['portfolio']) //Successful user login - redirect to porfolio
			}
		}
		catch(e){
			console.log(e)
			this.showErrorLogin(this.UNKNOWN_ERROR_STR)
			this.loggingIn = false;
		}
	}

}