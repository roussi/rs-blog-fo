import { Route, Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { AbstractLayoutComponent } from './shared/abstract-layout/abstract-layout.component';
import { ArticleDetailComponent } from './article/article-detail/article-detail.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ContactComponent } from './contact/contact.component';

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
                        path: 'blog',
                        component: HomeComponent
                    },
                    {
                        path: 'contact',
                        component: ContactComponent
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
      redirectTo: '/blog',
      pathMatch: 'full'
    },
    { path: '**', component: PageNotFoundComponent }
];
