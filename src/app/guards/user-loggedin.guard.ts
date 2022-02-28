import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthApiService } from 'app/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedInGuard implements CanActivate {
  constructor (private authService: AuthApiService, private router: Router){}
  canActivate(
    //@ts-ignore
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const url: string = state.url;
      if (this.authService.loggedIn){
        return true;
      }
      console.log("Rejected!")
      this.authService.redirectUrl = url;

      return this.router.parseUrl('/login')
  }
  
}
