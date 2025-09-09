import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-character-dialog',
    standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-character-dialog.html',
  styleUrl: './create-character-dialog.scss'
})
export class CreateCharacterDialog {

 private dialogRef = inject(MatDialogRef<CreateCharacterDialog>);
 private defaultImagePath = 'image_not_available.jpg';

  newCharacter = {
    name: '',
    description: '',
    thumbnail: {
      path: '',
      extension: 'jpg'
    }
  };

  onCreate() {
    if (this.newCharacter.name.trim()) {
      //  ID único (simulado)
   const imagePath = this.newCharacter.thumbnail.path.trim() === '' || 
                       !this.isValidUrl(this.newCharacter.thumbnail.path)
        ? this.defaultImagePath
        : this.newCharacter.thumbnail.path;

      const characterWithId = {
        ...this.newCharacter,
        thumbnail: {
          path: imagePath,
          extension: this.getExtension(imagePath)
        },
        id: Math.floor(Math.random() * 10000),
        modified: new Date().toISOString()
      };
      
      this.dialogRef.close(characterWithId);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

    private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  private getExtension(path: string): string {
    const parts = path.split('.');
    return parts.length > 1 ? parts.pop()!.toLowerCase() : 'jpg';
  }

  handleImageError(event: Event) {
  const imgElement = event.target as HTMLImageElement;
  
  const possiblePaths = [
    'assets/images/default-character.jpg',
    '/assets/images/default-character.jpg',
    'default-character.jpg'
  ];
  
  if (possiblePaths.includes(imgElement.src)) {
    return;
  }
  
  imgElement.src = this.defaultImagePath;
}
}