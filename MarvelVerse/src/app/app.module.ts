import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.componenet';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { CharacterList } from './components/character-list/character-list';
import { Project } from './project/project';

import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
     AppComponent,
     Project,
   ],
   imports: [
    CharacterList,
    BrowserModule,
    HttpClientModule, 
    RouterModule.forRoot(routes),
    CommonModule,
    MatToolbarModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
   ],
   exports: [RouterModule],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
