import { Component } from '@angular/core';
import { faLink, faClock, faComment, faUserClock, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'aroussi-blog-fo';
  faTree = faLink;
  faArrowAltCircleRight = faArrowRight;
  faClock = faClock;
  faComment = faComment;
}
