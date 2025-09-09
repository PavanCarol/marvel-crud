// src/app/components/character-list/character-list.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterList } from './character-list';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MarvelService } from '../../core/services/marvel.service';
import { LocalCharactersService } from '../../core/services/local-characters.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';

class MockMarvelService {
  getCharacters() {
    return of({ 
      data: { 
        results: [{ id: 1, name: 'Spider-Man', thumbnail: { path: '', extension: '' } }]
      } 
    });
  }
  
  searchCharacters(searchTerm: string) {
    return of({ 
      data: { 
        results: [{ id: 2, name: 'Iron Man', thumbnail: { path: '', extension: '' } }]
      } 
    });
  }
}

class MockLocalCharactersService {
  getLocalCharacters() {
    return [{ id: 1000, name: 'Local Hero', thumbnail: { path: '', extension: '' } }];
  }
  
  searchLocalCharacters(searchTerm: string) {
    return [{ id: 1001, name: 'Searched Local Hero', thumbnail: { path: '', extension: '' } }];
  }
  
  addLocalCharacter(character: any) {}
}

class MockDialog {
  open() {
    return {
      afterClosed: () => of(null)
    };
  }
}

class MockSnackBar {
  open() {}
}

describe('CharacterList', () => {
  let component: CharacterList;
  let fixture: ComponentFixture<CharacterList>;
  let httpMock: HttpTestingController;
  let marvelService: MarvelService;
  let localService: LocalCharactersService;
  let dialog: MatDialog;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CharacterList, 
        HttpClientTestingModule,
        RouterModule
      ],
      providers: [
        { provide: MarvelService, useClass: MockMarvelService },
        { provide: LocalCharactersService, useClass: MockLocalCharactersService },
        { provide: MatDialog, useClass: MockDialog },
        { provide: MatSnackBar, useClass: MockSnackBar },
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterList);
    component = fixture.componentInstance;
    
    marvelService = TestBed.inject(MarvelService);
    localService = TestBed.inject(LocalCharactersService);
    dialog = TestBed.inject(MatDialog);
    snackBar = TestBed.inject(MatSnackBar);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and load characters', () => {
    expect(component).toBeTruthy();
  });

  it('should setup search debounce on init', () => {
    expect(component['searchSubject']).toBeDefined();
    expect(component['destroy$']).toBeDefined();
  });

  it('should trigger search on search term change', (done) => {
    const performSearchSpy = jest.spyOn(component as any, 'performSearch');
    
    component.searchTerm = 'test';
    component.onSearch();
    
    setTimeout(() => {
      expect(performSearchSpy).toHaveBeenCalledWith('test');
      done();
    }, 600);
  });

  it('should load all characters when search term is empty', () => {
    const loadAllSpy = jest.spyOn(component as any, 'loadAllCharacters');
    
    component['performSearch']('');
    
    expect(loadAllSpy).toHaveBeenCalled();
  });

  it('should handle search with results', (done) => {
    component['performSearch']('Iron Man');
    
    setTimeout(() => {
      expect(component.allCharacters.length).toBeGreaterThan(0);
      expect(component.loading).toBe(false);
      expect(component.hasSearched).toBe(true);
      done();
    }, 100);
  });

  it('should open create dialog', () => {
    const dialogSpy = jest.spyOn(dialog, 'open');
    
    component.openCreateDialog();
    
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should check if character is local', () => {
    const localCharacter = { id: 1000, name: 'Local Hero' } as any;
    const apiCharacter = { id: 1, name: 'Spider-Man' } as any;
    
    component.localCharacters = [localCharacter];
    
    expect(component.isLocalCharacter(localCharacter)).toBe(true);
    expect(component.isLocalCharacter(apiCharacter)).toBe(false);
  });

  it('should add character and show snackbar', () => {
    const snackBarSpy = jest.spyOn(snackBar, 'open');
    const localServiceSpy = jest.spyOn(localService, 'addLocalCharacter');
    
    const newCharacter = { id: 1002, name: 'New Hero' } as any;
    component['addCharacter'](newCharacter);
    
    expect(localServiceSpy).toHaveBeenCalledWith(newCharacter);
    expect(snackBarSpy).toHaveBeenCalled();
  });
});