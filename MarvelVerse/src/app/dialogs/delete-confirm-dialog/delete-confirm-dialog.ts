import { CommonModule } from '@angular/common';
import { Component,inject  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-delete-confirm-dialog',
  standalone: true,
  imports: [
     CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './delete-confirm-dialog.html',
  styleUrl: './delete-confirm-dialog.scss'
})
export class DeleteConfirmDialog {
 private dialogRef = inject(MatDialogRef<DeleteConfirmDialog>);

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false); 
  }
}
