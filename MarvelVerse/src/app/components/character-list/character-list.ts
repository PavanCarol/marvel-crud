import { Component,inject, OnDestroy, OnInit } from '@angular/core';
import { MarvelService } from '../../core/services/marvel.service';
import { Character } from '../../models/character.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-character-list',
  standalone:true,
  imports: [
    CommonModule, 
    MatIconModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './character-list.html',
  styleUrl: './character-list.scss'
})
export class CharacterList  implements OnInit, OnDestroy {
  private marvelService = inject(MarvelService);
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();
  
  characters: Character[] = [];
  loading = true;
  searchTerm: string = '';
  hasSearched: boolean = false;

  ngOnInit() {
    this.setupSearchDebounce();
    this.loadCharacters();
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
      this.loadCharacters(); 
    } else {
      this.marvelService.searchCharacters(searchTerm).subscribe({
        next: (response) => {
          this.characters = response.data.results;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erro na pesquisa:', error);
          this.characters = [];
          this.loading = false;
        }
      });
    }
  }

  private loadCharacters() {
    this.marvelService.getCharacters().subscribe({
      next: (response) => {
        this.characters = response.data.results;
        this.loading = false;
        this.hasSearched = false;
      },
      error: (error) => {
        console.error('Error fetching characters:', error);
        this.loading = false;
      }
    });
  }
}
