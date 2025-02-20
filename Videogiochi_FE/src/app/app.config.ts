import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideNgxStripe } from 'ngx-stripe';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),
    provideNgxStripe(
      'pk_test_51QsLXHJqVx4MPSoSuAS8EJNOqRAvIiPr2yswaPCSN2jbYrXHuVZV2IZfM8p7zEeIaO4YPSjNNtGBgHxIvVYoUh8P00jT3mdVDP'
    ),
  ],
};
