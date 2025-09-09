import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCharacterDialog } from './create-character-dialog';

describe('CreateCharacterDialog', () => {
  let component: CreateCharacterDialog;
  let fixture: ComponentFixture<CreateCharacterDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCharacterDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCharacterDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
