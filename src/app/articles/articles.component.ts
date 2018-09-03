import { Component, OnInit } from '@angular/core';
import {faArrowRight, faClock, faComment, faLink} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styles: []
})
export class ArticlesComponent implements OnInit {

  faTree = faLink;
  faArrowAltCircleRight = faArrowRight;
  faClock = faClock;
  faComment = faComment;

  constructor() { }

  ngOnInit() {
  }



}
