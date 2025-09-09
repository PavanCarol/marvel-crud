import { CommonModule } from '@angular/common';
import { Component,inject  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-content-edit',
   standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './dialog-content-edit.html',
  styleUrl: './dialog-content-edit.scss'
})
export class DialogContentEdit {
 private dialogRef = inject(MatDialogRef<DialogContentEdit>);
 private data = inject(MAT_DIALOG_DATA);
 private defaultImagePath = 'image_not_available.jpg';
  characterData = {
    name: '',
    description: '',
    thumbnail: {
      path: '',
      extension: 'jpg'
    }
  };

   constructor() {
    if (this.data) {
      if (this.data.thumbnail) {
        this.characterData = {
          name: this.data.name || '',
          description: this.data.description || '',
          thumbnail: {
            path: this.data.thumbnail.path || '',
            extension: this.data.thumbnail.extension || 'jpg'
          }
        };
      } else {
       
        this.characterData.name = this.data.name || '';
        this.characterData.description = this.data.description || '';
        this.characterData.thumbnail.path = this.defaultImagePath;
      }
    } else {
      this.characterData.thumbnail.path = this.defaultImagePath;
    }
  }

  onSave() {
    this.characterData.thumbnail.extension = this.getExtension(this.characterData.thumbnail.path);
    
    console.log('Dados salvos:', this.characterData);
    this.dialogRef.close(this.characterData);
  }

  onCancel() {
    this.dialogRef.close();
  }

  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.defaultImagePath;
  }

  private getExtension(path: string): string {
    const parts = path.split('.');
    return parts.length > 1 ? parts.pop()!.toLowerCase() : 'jpg';
  }
}
