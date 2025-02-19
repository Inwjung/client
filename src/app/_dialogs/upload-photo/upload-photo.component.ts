import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog'
import { fileTypeFromBlob } from 'file-type'


@Component({
  selector: 'app-upload-photo',
  imports: [MatDialogActions, MatDialogContent, MatButtonModule, MatDialogTitle, CommonModule],
  templateUrl: './upload-photo.component.html',
  styleUrl: './upload-photo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadPhotoComponent {
  acceptedImageType = ['image/jpeg', 'image/png']
  imageFiles: File | undefined
  imagePreview = signal<undefined | string>(undefined)
  errMessage = signal<undefined | string>(undefined)

  private readonly dialogRef = inject(MatDialogRef<UploadPhotoComponent>)

  onSubmit() {
    this.dialogRef.close(this.imageFiles)
  }
  async onImgPicked(event: Event) {
    this.imagePreview.set(undefined)
    this.errMessage.set(undefined)
    this.imageFiles = undefined
    const input = event.target as HTMLInputElement

    if (input.files && input.files.length > 0) {
      this.imageFiles = input.files[0]
      const fileType = await fileTypeFromBlob(this.imageFiles)
      if (fileType && this.acceptedImageType.includes(fileType.mime)) {
        const fileReader = new FileReader()
        fileReader.onload = () => {
          this.imagePreview.set(fileReader.result as string)
        }
        fileReader.readAsDataURL(this.imageFiles)
      } else {
        this.imageFiles = undefined
        this.errMessage.set('Image file must be .jpeg or .png')
      }
    }
  }
}
