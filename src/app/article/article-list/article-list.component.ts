import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  articles: Article[];

  constructor(articleService: ArticleService) {
    /* articleService.getAllArticles().subscribe(data => {
      this.articles = data;
      console.log(data);
    }); */
  }

  ngOnInit() {
  }

}
