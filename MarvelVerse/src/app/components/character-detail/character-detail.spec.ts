import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterDetail } from './character-detail';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MarvelService } from '../../core/services/marvel.service';
import { LocalCharactersService } from '../../core/services/local-characters.service';
import { of } from 'rxjs';
import { Character } from '../../models/character.model'; // ✅ Importe a interface

// Mock do Router
class MockRouter {
  navigate = jest.fn();
}

describe('CharacterDetail', () => {
  let component: CharacterDetail;
  let fixture: ComponentFixture<CharacterDetail>;
  let marvelService: MarvelService;
  let localService: LocalCharactersService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterDetail, HttpClientTestingModule],
      providers: [
        { 
          provide: ActivatedRoute, 
          useValue: { 
            params: of({ id: '1' }),
            snapshot: { paramMap: { get: () => '1' } }
          } 
        },
        { provide: Router, useClass: MockRouter },
        MarvelService,
        LocalCharactersService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterDetail);
    component = fixture.componentInstance;
    marvelService = TestBed.inject(MarvelService);
    localService = TestBed.inject(LocalCharactersService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load character details on init for API character', () => {
    const mockResponse = { 
      data: { 
        results: [{ 
          id: 1, 
          name: 'Spider-Man', 
          description: 'Homem-Aranha é um super-herói das histórias em quadrinhos americanas publicadas pela Marvel Comics . Criado pelo escritor e editor Stan Lee e pelo artista Steve Ditko , ele apareceu pela primeira vez na antologia de histórias em quadrinhos Amazing Fantasy #15 (agosto de 1962) na Era de Prata das Histórias em Quadrinhos ',
          modified: new Date().toISOString(), 
          thumbnail: { path: '', extension: '' },
          comics: { available: 10 },
          series: { available: 5 },
          stories: { available: 20 }
        }]
      } 
    };

    component.ngOnInit();
    
    const req = httpMock.expectOne(req => req.url.includes('/characters/1'));
    req.flush(mockResponse);

    expect(component.character?.name).toBe('Spider-Man');
    expect(component.character?.description).toBe('Friendly neighborhood');
  });

  it('should load character details for local character', () => {
    const localCharacter: Character = { 
      id: 1000,
      name: 'Capitão América', 
      description: 'Capitão América é um super-herói de histórias em quadrinhos americanos publicado pela Marvel Comics.',
      modified: new Date().toISOString(), 
      thumbnail: { 
        path: 'custom',
        extension: 'jpg' 
      },
    };

    jest.spyOn(localService, 'getLocalCharacterById').mockReturnValue(localCharacter);
    
    component.ngOnInit();

    expect(component.character?.name).toBe('Capitão América');
    expect(component.isLocalCharacter).toBe(true);
  });

  it('should go back', () => {
    const routerSpy = jest.spyOn(router, 'navigate');
    
    component.goBack();
    
    expect(routerSpy).toHaveBeenCalledWith(['/']);
  });
});