import { Component, OnInit } from '@angular/core';
import {faClock, faHeart} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styles: []
})
export class ArticleDetailComponent implements OnInit {

  faClock = faClock;
  faHeart = faHeart;
  constructor() { }

  ngOnInit() {
  }

}
