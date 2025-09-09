import { Injectable, signal, computed } from '@angular/core';
import { Character } from '../../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class LocalCharactersService {
  private storageKey = 'marvel-local-characters';
  
  private charactersState = signal<Character[]>(this.loadFromStorage());
  
  characters = computed(() => this.charactersState());

  private loadFromStorage(): Character[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  private saveToStorage(characters: Character[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(characters));
  }

  getLocalCharacters(): Character[] {
    return this.characters();
  }

  addLocalCharacter(character: Character): void {
    this.charactersState.update(characters => {
      const newCharacters = [...characters, character];
      this.saveToStorage(newCharacters);
      return newCharacters;
    });
  }

  getLocalCharacterById(id: number): Character | undefined {
    return this.characters().find(char => char.id === id);
  }

  searchLocalCharacters(searchTerm: string): Character[] {
    if (!searchTerm.trim()) return this.characters();
    
    return this.characters().filter(character =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  updateLocalCharacter(updatedCharacter: Character): void {
    this.charactersState.update(characters => {
      const newCharacters = characters.map(char =>
        char.id === updatedCharacter.id ? updatedCharacter : char
      );
      this.saveToStorage(newCharacters);
      return newCharacters;
    });
  }

  deleteLocalCharacter(id: number): void {
    this.charactersState.update(characters => {
      const newCharacters = characters.filter(char => char.id !== id);
      this.saveToStorage(newCharacters);
      return newCharacters;
    });
  }
}