import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteConfirmDialog } from './delete-confirm-dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('DeleteConfirmDialog', () => {
  let component: DeleteConfirmDialog;
  let fixture: ComponentFixture<DeleteConfirmDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteConfirmDialog], 
      providers: [ 
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteConfirmDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});