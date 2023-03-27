import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class MembershipAuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authService.isAuthenticated().pipe(switchMap(response => {
            if (response) {
                return this.authService.isAuthMember().pipe(map(isMember => {
                    if (isMember) {
                        return true;
                    } else {
                        return this.router.createUrlTree(['/main']);
                    }
                }),
                    catchError(() => of(this.router.createUrlTree(['/main'])))
                );
            } else {
                return of(this.router.createUrlTree(['/main']));
            }
        }),
            catchError(() => of(this.router.createUrlTree(['/main'])))
        );
    }

}
