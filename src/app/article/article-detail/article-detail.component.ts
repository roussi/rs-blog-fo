import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { articles } from '../article.mock';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article: Article = articles[0];
  pageId = '/home';
  constructor() { }

  ngOnInit() {
  }

}
