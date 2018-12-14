import { Route, Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';

export const ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path : '',
        component: AppComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'login',
                component: LoginComponent
            }
        ]
    }
];
