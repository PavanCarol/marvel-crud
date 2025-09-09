import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentEdit } from './dialog-content-edit';

describe('DialogContentEdit', () => {
  let component: DialogContentEdit;
  let fixture: ComponentFixture<DialogContentEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogContentEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogContentEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
