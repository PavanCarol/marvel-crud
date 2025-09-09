import { TestBed } from '@angular/core/testing';
import { LocalCharactersService } from './local-characters.service';

describe('LocalCharactersService', () => {
  let service: LocalCharactersService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalCharactersService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add and get local characters', () => {
    const character = { id: 1000, name: 'Test Hero' } as any;
    service.addLocalCharacter(character);
    
    const characters = service.getLocalCharacters();
    expect(characters.length).toBe(1);
    expect(characters[0].name).toBe('Test Hero');
  });

  it('should search local characters', () => {
    const character = { id: 1000, name: 'Test Hero' } as any;
    service.addLocalCharacter(character);
    
    const results = service.searchLocalCharacters('Test');
    expect(results.length).toBe(1);
    expect(results[0].name).toBe('Test Hero');
  });

  it('should get character by id', () => {
    const character = { id: 1000, name: 'Test Hero' } as any;
    service.addLocalCharacter(character);
    
    const found = service.getLocalCharacterById(1000);
    expect(found?.name).toBe('Test Hero');
  });

  it('should return undefined for non-existent character', () => {
    const found = service.getLocalCharacterById(9999);
    expect(found).toBeUndefined();
  });

});