import { Component,inject, OnDestroy, OnInit } from '@angular/core';
import { MarvelService } from '../../core/services/marvel.service';
import { Character } from '../../models/character.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateCharacterDialog } from '../../dialogs/create-character-dialog/create-character-dialog';
import { LocalCharactersService } from '../../core/services/local-characters.service';

@Component({
  selector: 'app-character-list',
  standalone:true,
  imports: [
    CommonModule, 
    MatIconModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './character-list.html',
  styleUrl: './character-list.scss'
})
export class CharacterList  implements OnInit, OnDestroy {
  
  private marvelService = inject(MarvelService);
  private localService = inject(LocalCharactersService);
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  
  characters: Character[] = [];
  localCharacters: Character[] = [];
  allCharacters: Character[] = [];
  loading = true;
  searchTerm: string = '';
  hasSearched: boolean = false;

  ngOnInit() {
    this.setupSearchDebounce();
    this.loadAllCharacters();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearchDebounce() {
    this.searchSubject.pipe(
      debounceTime(500), 
      distinctUntilChanged(), 
      takeUntil(this.destroy$)
    ).subscribe(searchTerm => {
      this.performSearch(searchTerm);
    });
  }

  onSearch() {
    this.searchSubject.next(this.searchTerm);
  }

  private performSearch(searchTerm: string) {
    this.loading = true;
    this.hasSearched = true;
    
    if (searchTerm.trim() === '') {
      this.loadAllCharacters(); 
    } else {
      this.marvelService.searchCharacters(searchTerm).subscribe({
        next: (response) => {
          const apiCharacters = response.data.results;
          const localCharacters = this.localService.searchLocalCharacters(searchTerm);
          
          this.allCharacters = [...localCharacters,...apiCharacters];
          this.loading = false;
        },
        error: (error) => {
          console.error('Erro na pesquisa:', error);
          const localCharacters = this.localService.searchLocalCharacters(searchTerm);
          this.allCharacters = localCharacters;
          this.loading = false;
        }
      });
    }
  }

  private loadAllCharacters() {
   this.loading = true;
    
    this.marvelService.getCharacters().subscribe({
      next: (response) => {
        this.characters = response.data.results;
        this.localCharacters = this.localService.getLocalCharacters();
        
        this.allCharacters = [ ...this.localCharacters,...this.characters];
        this.loading = false;
        this.hasSearched = false;
      },
      error: (error) => {
        console.error('Error fetching characters:', error);
 
        this.localCharacters = this.localService.getLocalCharacters();
        this.allCharacters = this.localCharacters;
        this.loading = false;
      }
    });
  }

   openCreateDialog() {
    const dialogRef = this.dialog.open(CreateCharacterDialog, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCharacter(result);
      }
    });
  }

  private addCharacter(newCharacter: Character) {
  this.localService.addLocalCharacter(newCharacter);
  
  this.localCharacters = this.localService.getLocalCharacters();
  
  this.allCharacters = [...this.characters, ...this.localCharacters];
  
  this.snackBar.open('Personagem criado com sucesso!', 'Fechar', {
    duration: 3000,
    panelClass: 'success-snackbar'
  });
}
isLocalCharacter(character: Character): boolean {
    return this.localCharacters.some(localChar => localChar.id === character.id);
  }
}
