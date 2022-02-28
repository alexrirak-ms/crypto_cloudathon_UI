import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class LoginApiService {
  user : any;
  authToken:any;
  constructor(private http: HttpClient){

    }
    
  //check if user is logged in
  authenticateUser(user:any){
    console.log(user)
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post<any>('http://localhost:3600/users/login', user,{headers:headers});
  }

  storeUserData(user:any ) {
    //localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user =user;

  }

}