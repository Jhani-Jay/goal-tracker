import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

//third party libraries
import { ConfirmationService, } from 'primeng/api';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

//local imports
import { routes } from './app.routes';
import { GoalEffects } from './core/state/goal.effect';
import { goalReducer } from './core/state/goal.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideAnimationsAsync(),
    ConfirmationService,
    provideStore(),
    provideEffects(GoalEffects),
    provideState({name: 'goal', reducer: goalReducer}),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
