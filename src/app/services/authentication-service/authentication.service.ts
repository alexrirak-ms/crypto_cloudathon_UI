import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';


import {forkJoin} from 'rxjs';
import { LoginStatus } from 'app/models';
@Injectable()
export class AuthApiService {
  userId: any;
  username: any;
  authToken: any;
  env: any;
  initPromise: any;
  loggedIn: any;
  redirectUrl: any;
    constructor(private http: HttpClient){

    }
    //Returns an already existing/initialized user token
    getUserToken(){
      return this.userId; //for now, use userId. In the future, we may change over to an auth token
    }

    //Fetches user ID based on a given username
    fetchUserId(username: string, password: string){
      if (!password) console.log("No PW provided")
      //When we do eventually utilize the PW, this should be a POST request instead
      let params = new HttpParams().set("create_user", "True") //hardcoded to True for now, always create a new user
      return this.http.get("http://crypto-banksters-wallet-api.azurewebsites.net/user/by-username/" + username, {params: params})
    }

    async initUserAuth(_username: string, _password: string) : Promise<LoginStatus>{
      var p = new Promise<LoginStatus>((prom, rej) => {
        if (!rej){} //to make typescript shut up
        this.username = _username //don't store the password because that would be dumb
        this.initPromise = forkJoin([this.fetchUserId(this.username, _password)]).subscribe(resultArray => {

          let userIdResponse = resultArray[0]; //The response for fetchUserId

          //TODO - should be some handler for error/null userIdResponse
          if (userIdResponse){
            this.userId = resultArray[0]
            this.loggedIn = true;
            return prom(new LoginStatus(1, "Logged in successfully"))
          }
          //Some kind of rejection from the server
          else{
            return prom(new LoginStatus(-1, "Bad user credentials"))
          }
        }, error => {
          if (error.status === 404){
            this.userId = 12345;
            this.loggedIn = true;
            return prom(new LoginStatus(1, "Logged in successfully"))
          }
          else{
            console.log(error)
            return prom(new LoginStatus(-1, "Backend error: " + error.statusText))
          }
        })
      })
      return p;
    }
}