import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCharacterDialog } from './create-character-dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('CreateCharacterDialog', () => {
  let component: CreateCharacterDialog;
  let fixture: ComponentFixture<CreateCharacterDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CreateCharacterDialog,
        FormsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      providers: [ 
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCharacterDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});