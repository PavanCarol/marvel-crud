import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '../../models/character.model';
import { MarvelService } from '../../core/services/marvel.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogContentEdit } from '../../dialogs/dialog-content-edit/dialog-content-edit';
import { MatIconModule } from '@angular/material/icon';
import { DeleteConfirmDialog } from '../../dialogs/delete-confirm-dialog/delete-confirm-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalCharactersService } from '../../core/services/local-characters.service';
@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './character-detail.html',
  styleUrl: './character-detail.scss'
})
export class CharacterDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private marvelService = inject(MarvelService);
  private localService = inject(LocalCharactersService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  
  character: Character | null = null;
  loading = true;
  isLocalCharacter = false;

  ngOnInit() {
    const characterId = this.route.snapshot.paramMap.get('id');
    
    if (characterId) {
      this.loadCharacterDetails(+characterId);
    } else {
      this.router.navigate(['/']);
    }
  }

  private loadCharacterDetails(id: number) {
    const localCharacter = this.localService.getLocalCharacterById(id);
    
    if (localCharacter) {
      this.character = localCharacter;
      this.isLocalCharacter = true;
      this.loading = false;
    } else {
      this.marvelService.getCharacterById(id).subscribe({
        next: (response) => {
          this.character = response.data.results[0];
          this.isLocalCharacter = false;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar personagem:', error);
          this.loading = false;
          this.router.navigate(['/']);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

 openDialog() {
   if (this.isLocalCharacter) {
    const dialogRef = this.dialog.open(DialogContentEdit, {
      data: this.character 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.character) {
        this.character.name = result.name;
        this.character.description = result.description;
        this.character.thumbnail = result.thumbnail;
        
        this.updateLocalCharacter();
      }
    });
  } else {
    this.snackBar.open('Personagens da Marvel não podem ser editados', 'Fechar', {
      duration: 3000
    });
  }
}

   private updateLocalCharacter() {
  if (this.character && this.isLocalCharacter) {
    const localCharacters = this.localService.getLocalCharacters();
    const index = localCharacters.findIndex(char => char.id === this.character!.id);
    
    if (index !== -1) {
      localCharacters[index] = { 
        ...localCharacters[index], 
        name: this.character.name,
        description: this.character.description,
        thumbnail: this.character.thumbnail
      };
      
      localStorage.setItem('marvel-local-characters', JSON.stringify(localCharacters));
      this.snackBar.open('Personagem atualizado com sucesso!', 'Fechar', {
        duration: 3000,
        panelClass: 'success-snackbar'
      });
    }
  }
}

 openDeleteDialog() {
   if (this.isLocalCharacter) {
      const dialogRef = this.dialog.open(DeleteConfirmDialog);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.deleteCharacter();
        }
      });
    } else {
      this.snackBar.open('Personagens da Marvel não podem ser excluídos', 'Fechar', {
        duration: 3000
      });
    }
  }

   private deleteCharacter() {
     if (this.character && this.isLocalCharacter) {
      this.loading = true;
      
      const localCharacters = this.localService.getLocalCharacters();
      const updatedCharacters = localCharacters.filter(char => char.id !== this.character!.id);
      
      localStorage.setItem('marvel-local-characters', JSON.stringify(updatedCharacters));
      
      setTimeout(() => {
        this.loading = false;
        this.showSuccessMessage();
        this.router.navigate(['/']); 
      }, 1000);
    }
  }

  private showSuccessMessage() {
    this.snackBar.open('Personagem excluído com sucesso!', 'Fechar', {
      duration: 3000,
      panelClass: 'success-snackbar'
    });
  }

}