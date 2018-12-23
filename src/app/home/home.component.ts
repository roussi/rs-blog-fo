import { Component, OnInit } from '@angular/core';
import { Article } from '../article/article';
import { articles } from '../article/article.mock';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  article: Article = articles[0];
  pageId = '/home';
  constructor() { }

  ngOnInit() {
  }

}
