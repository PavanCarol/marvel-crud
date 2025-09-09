import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '../../models/character.model';
import { MarvelService } from '../../core/services/marvel.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogContentEdit } from '../../dialogs/dialog-content-edit/dialog-content-edit';
import { MatIconModule } from '@angular/material/icon';

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
  
  character: Character | null = null;
  loading = true;

  ngOnInit() {
    const characterId = this.route.snapshot.paramMap.get('id');
    
    if (characterId) {
      this.loadCharacterDetails(+characterId);
    } else {
      this.router.navigate(['/']);
    }
  }

  private loadCharacterDetails(id: number) {
    this.marvelService.getCharacterById(id).subscribe({
      next: (response) => {
        this.character = response.data.results[0];
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar personagem:', error);
        this.loading = false;
        this.router.navigate(['/']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  readonly dialog = inject(MatDialog);

 openDialog() {
  const dialogRef = this.dialog.open(DialogContentEdit, {
    data: {
      name: this.character?.name,
      description: this.character?.description
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Dados editados:', result);
      if (this.character) {
        this.character.name = result.name;
        this.character.description = result.description;
      }
    }
  });
}
}