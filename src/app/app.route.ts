import { Route, Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { AbstractLayoutComponent } from './shared/abstract-layout/abstract-layout.component';
import { ArticleDetailComponent } from './article/article-detail/article-detail.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

export const ROUTES: Routes = [
    {
        path : '',
        component: AppComponent,
        children: [
            {
                path: '',
                component: AbstractLayoutComponent,
                children: [
                    {
                        path: 'home',
                        component: HomeComponent
                    },
                    {
                        path: 'articles',
                        component: ArticleListComponent
                    },
                    {
                        path: 'articles/:refName',
                        component: ArticleDetailComponent
                    }
                ]
            },
            {
                path: 'login',
                component: LoginComponent
            }
        ]
    },
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    },
    { path: '**', component: PageNotFoundComponent }
];
