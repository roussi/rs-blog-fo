import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { AbstractLayoutComponent } from './shared/abstract-layout/abstract-layout.component';
import { ArticleDetailComponent } from './article/article-detail/article-detail.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ContactComponent } from './contact/contact.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/contact',
    pathMatch: 'full'
  },
  {
        path : '',
        component: AppComponent,
        children: [
            {
                path: '',
                component: AbstractLayoutComponent,
                children: [
                    {
                        path: 'articles',
                        component: ArticleListComponent
                    },
                    {
                      path: 'articles/spring-boot-validation-errors',
                      component: ArticleDetailComponent
                    },
                    {
                        path: 'contact',
                        component: ContactComponent
                    }
                ]
            },
            {
                path: 'login',
                component: LoginComponent
            }
        ]
    },
    { path: '**', component: PageNotFoundComponent }
];
