import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  CharacterDataWrapper, 
  Character 
} from '../../models/character.model';
import { environment } from '../../../environments/environments';
import { Md5 } from 'md5-typescript';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  private http = inject(HttpClient);
  private apiUrl = 'https://gateway.marvel.com/v1/public';
  private publicKey = environment.marvelPublicKey;
  private privateKey = environment.marvelPrivateKey;

private generateHash(timestamp: string): string {
  return Md5.init(`${timestamp}${this.privateKey}${this.publicKey}`);
}

  private generateAuthParams(): HttpParams {
    const ts = new Date().getTime().toString();
    const hash = this.generateHash(ts); 

    return new HttpParams()
      .set('ts', ts)
      .set('apikey', this.publicKey)
      .set('hash', hash);
  }

  getCharacters(offset: number = 0, limit: number = 20): Observable<CharacterDataWrapper> {
    const params = this.generateAuthParams()
      .set('offset', offset.toString())
      .set('limit', limit.toString());

    return this.http.get<CharacterDataWrapper>(
      `${this.apiUrl}/characters`,
      { params }
    );
  }

  getCharacterById(id: number): Observable<CharacterDataWrapper> {
    const params = this.generateAuthParams();
    
    return this.http.get<CharacterDataWrapper>(
      `${this.apiUrl}/characters/${id}`,
      { params }
    );
  }

  searchCharacters(name: string, limit: number = 20): Observable<CharacterDataWrapper> {
    const params = this.generateAuthParams()
      .set('nameStartsWith', name)
      .set('limit', limit.toString());

    return this.http.get<CharacterDataWrapper>(
      `${this.apiUrl}/characters`,
      { params }
    );
  }
}