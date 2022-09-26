import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
// Make the class implement CanActivate interface as
// we are implementing CanActivate guard service
export class CustomerGuardService implements CanActivate {
  constructor(private _router: Router) {}
  // Provide implementation for canActivate() method of CanActivate interface
  // Return true if navigation is allowed, otherwise false
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log(route.routeConfig?.path);
    console.log((localStorage.getItem('packageFilterMenuList')));
    const employeeExists = 0;

    if (employeeExists) {
      return true;
    } else {
      this._router.navigate(['/notfound']);
      return false;
    }
  }
}
