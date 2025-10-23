import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./gift/pages/dashboard-page/dashboard-page.component'),
        children: [
            {
                path: 'trending',
                loadComponent: () =>
                    import('./gift/pages/trendig-page/trendig-page.component')
            },
            {

                path: 'search',
                loadComponent: () =>
                    import('./gift/pages/search-page/search-page.component')
            },
            {
                path: 'principal',
                loadComponent: () =>
                    import('./gift/pages/dashboard-principal/dashboard-page.component')
            }



        ]
    },

   /* {
        path: 'trending',
        loadComponent: () =>
            import('./gift/pages/trendig-page/trendig-page.component')
    },

    {
        path: 'search',
        loadComponent: () =>
            import('./gift/pages/search-page/search-page.component')
    },*/

    {
        path: '**',
        redirectTo: 'dashboard'
    }

];
