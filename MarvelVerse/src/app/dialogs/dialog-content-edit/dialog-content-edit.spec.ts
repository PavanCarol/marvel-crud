import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogContentEdit } from './dialog-content-edit';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('DialogContentEdit', () => {
  let component: DialogContentEdit;
  let fixture: ComponentFixture<DialogContentEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DialogContentEdit,
        FormsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      providers: [ 
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogContentEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});