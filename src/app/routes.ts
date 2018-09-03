import {Routes} from '@angular/router';
import {ArticlesComponent} from './articles/articles.component';
import {AppComponent} from './app.component';
import {ArticleDetailComponent} from './articles/article-detail.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'articles',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'articles', component: ArticlesComponent
      },
      {
        path: 'articles/1234', component: ArticleDetailComponent
      }
    ]
  }
]
