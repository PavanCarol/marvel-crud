import { Routes } from '@angular/router';
import { routes } from './app.routes';
import { CharacterList } from './components/character-list/character-list';
import { Project } from './project/project';
import { CharacterDetail } from './components/character-detail/character-detail';

describe('App Routes', () => {
  it('should have the correct routes configuration', () => {
    expect(routes).toBeInstanceOf(Array);
    expect(routes.length).toBe(1);
    
    const mainRoute = routes[0];
    expect(mainRoute.path).toBe('');
    expect(mainRoute.component).toBe(Project);
    
    if (mainRoute.children) {
      expect(mainRoute.children.length).toBe(2);
      expect(mainRoute.children[0].path).toBe('');
      expect(mainRoute.children[0].component).toBe(CharacterList);
      expect(mainRoute.children[1].path).toBe('character/:id');
      expect(mainRoute.children[1].component).toBe(CharacterDetail);
    }
  });
});