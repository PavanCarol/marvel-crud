import { appConfig } from './app.config';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

describe('AppConfig', () => {
  it('should provide router configuration', () => {
    expect(appConfig.providers).toBeDefined();
    expect(appConfig.providers.length).toBe(1);
    
    const routerProvider = appConfig.providers[0];
    expect(routerProvider).toEqual(provideRouter(routes));
  });
});