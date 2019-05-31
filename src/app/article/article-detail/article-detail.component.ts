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
  comment = '<hello> Am a div </hello>';
  content_java = `
  public static void printed(Integer e){
    sleep(1000);
    System.out.println(String.format("+++++ number : %s, Thread %s", e, Thread.currentThread()));
}
  `;
  constructor() { }

  ngOnInit() {
  }

}
