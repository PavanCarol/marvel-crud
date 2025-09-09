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
  
  characterData = {
    name: '',
    description: ''
  };

   constructor() {
    if (this.data) {
      this.characterData.name = this.data.name || '';
      this.characterData.description = this.data.description || '';
    }
  }

  onSave() {
    console.log('Dados salvos:', this.characterData);
    this.dialogRef.close(this.characterData);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
