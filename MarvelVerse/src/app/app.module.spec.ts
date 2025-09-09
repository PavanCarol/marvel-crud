import { TestBed } from '@angular/core/testing';
import { AppModule } from './app.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.componenet';

describe('AppModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule]
    }).compileComponents();
  });

  it('should create the module', () => {
    const module = TestBed.inject(AppModule);
    expect(module).toBeTruthy();
  });

  it('should allow creation of AppComponent', () => {
    expect(() => {
      TestBed.createComponent(AppComponent);
    }).not.toThrow();
  });

  it('should provide required modules', () => {
    expect(() => TestBed.inject(RouterModule)).not.toThrow();
    expect(() => TestBed.inject(HttpClientModule)).not.toThrow();
    expect(() => TestBed.inject(CommonModule)).not.toThrow();
  });
});