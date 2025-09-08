import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.componenet';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { CharacterList } from './components/character-list/character-list';



@NgModule({
  declarations: [
     AppComponent,
    ],
    imports: [
    CharacterList,
     BrowserModule,
    HttpClientModule, 
    RouterModule.forRoot(routes),
    CommonModule
   ],
  providers: []
})
export class AppModule { }
