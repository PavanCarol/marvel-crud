import { Routes } from '@angular/router';
import { CharacterList } from './components/character-list/character-list';

export const routes: Routes = [
    { path: '', component:  CharacterList }, 
    { path: 'characters', component: CharacterList }
];
