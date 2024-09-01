import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('@ecommerce-mentoria-angular/home').then((c) => c.homeRoutes),
    // loadComponent: () => import('@ecommerce-mentoria-angular/home').then(c => c.HomeComponent)
  },
];
