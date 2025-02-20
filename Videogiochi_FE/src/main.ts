import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideNgxStripe } from 'ngx-stripe';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideNgxStripe(
      'pk_test_51QsLXHJqVx4MPSoSuAS8EJNOqRAvIiPr2yswaPCSN2jbYrXHuVZV2IZfM8p7zEeIaO4YPSjNNtGBgHxIvVYoUh8P00jT3mdVDP'
    ),
  ],
}).catch((err) => console.error(err));
