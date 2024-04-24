import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TimeagoModule } from 'ngx-timeago';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(TimeagoModule.forRoot()),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
  ],
};
