import { Routes } from '@angular/router';
import { CharacterList } from './components/character-list/character-list';
import { Project } from './project/project';
import { CharacterDetail } from './components/character-detail/character-detail';

export const routes: Routes = [
    { path: '', 
        component:  Project,
    children:[
        { path: '', component: CharacterList },
        { path: 'character/:id', component: CharacterDetail }
    ]
    }, 
];
