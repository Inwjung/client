import { Component, inject, Injectable, input } from '@angular/core';
import { User } from '../../_models/user';
import { MatDialog } from '@angular/material/dialog';
import { UploadPhotoComponent } from '../../_dialogs/upload-photo/upload-photo.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../_services/account.service';
import { TimeagoClock, TimeagoCustomFormatter, TimeagoDefaultClock, TimeagoFormatter, TimeagoIntl, TimeagoModule } from 'ngx-timeago'
import { strings as thaiString } from 'ngx-timeago/language-strings/th.js'


// @Injectable()
// class MyIntl extends TimeagoIntl {
// This is just ExamPle AHAHHAHA555+
// }

@Component({
  selector: 'app-photo',
  imports: [MatButtonModule, MatIconModule, MatCardModule, CommonModule, TimeagoModule],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss',
  providers: [
    { provide: TimeagoIntl, useClass: TimeagoIntl },
    { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
    { provide: TimeagoClock, useClass: TimeagoDefaultClock }
  ]
})
export class PhotoComponent {
  // intl = inject(TimeagoIntl) //We can use it in another ways
  user = input.required<User>()

  constructor(private intl: TimeagoIntl) {
    // intl.strings = thaiString
    this.intl.strings = thaiString
    this.intl.changes.next()
  }

  private accountService = inject(AccountService)
  private dialog = inject(MatDialog)

  openAddPhotoDialog() {
    const ref = this.dialog.open(UploadPhotoComponent)
    ref.afterClosed().subscribe(async file => {
      //want to send file to server
      await this.accountService.uploadPhoto(file)
    })
  }
  deletePhoto(photo_id: string) {
    this.accountService.deletePhoto(photo_id)
  }
  setAvatar(photo_id: string) {
    this.accountService.setAvatar(photo_id)
  }
}
