import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { ArticlesComponent } from './articles/articles.component';
import {RouterModule} from '@angular/router';
import {ROUTES} from './routes';
import { PostComponent } from './post/post.component';
import { ArticleDetailComponent } from './articles/article-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ArticlesComponent,
    PostComponent,
    ArticleDetailComponent
  ],
  imports: [
    RouterModule.forRoot(ROUTES, {enableTracing: true}),
    BrowserModule,
    MaterialModule,
    FontAwesomeModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
