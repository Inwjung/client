import { inject, Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { validateHorizontalPosition, validateVerticalPosition } from '@angular/cdk/overlay';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private router = inject(Router)
  private snackBarConsumeMoreHP = inject(MatSnackBar)
  private snackBarConfig: MatSnackBarConfig = {
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  }
  constructor() { }

  handleError(err: any) {
    if (err) {
      switch (err.status) {
        case 401:
          this.snackBarConsumeMoreHP.open('No pls No', 'More Pls', this.snackBarConfig)
          break;
        case 404:
          this.router.navigate(['/404'])
          break;
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
        case 505:
        case 506:
        case 507:
        case 508:
        case 509:
        case 510:
        case 511:
          if (err.error.message === 'Token has expired') {
            this.router.navigate(['/'])
          }
          const navExtra: NavigationExtras = {
            state: {
              message: err.error,
              code: err.status
            }
          }
          this.router.navigate(['/server-error'], navExtra)
          break
        default:
          this.snackBarConsumeMoreHP.open('Something went wrong, Do not try again.', 'Got it!', this.snackBarConfig)
          break;
      }
    }
    return throwError(() => err)
  }
}
