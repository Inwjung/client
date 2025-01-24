import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingRequestCount = 0

  private _ngxSpinner = inject(NgxSpinnerService)
  constructor() { }

  loading() {
    this.loadingRequestCount++
    this._ngxSpinner.show(undefined, {
      type: "pacman",
      bdColor: 'rgba(0,0,0,0.8)',
      color: "rgb(255, 255, 255)",
      fullScreen: true
    })
  }

  idle() {
    this.loadingRequestCount--
    if (this.loadingRequestCount <= 0) {
      this.loadingRequestCount = 0
      this._ngxSpinner.hide()
    }
  }
}
