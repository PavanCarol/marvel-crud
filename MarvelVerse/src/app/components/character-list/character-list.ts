import { Component,inject, OnInit } from '@angular/core';
import { MarvelService } from '../../core/services/marvel.service';
import { Character } from '../../models/character.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-list',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './character-list.html',
  styleUrl: './character-list.scss'
})
export class CharacterList  implements OnInit{
  private marvelService = inject(MarvelService);
  characters: Character[] = [];
  loading = true;

  ngOnInit() {
    this.marvelService.getCharacters().subscribe({
      next: (response) => {
        this.characters = response.data.results;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching characters:', error);
        this.loading = false;
      }
    });
  }
}
