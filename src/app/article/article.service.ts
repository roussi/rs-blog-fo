import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {API_URL} from '../app.constants';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {
  }

  test() {
    console.log('Hello friend ! do you want to do some scripting today ?');
  }
  getAllArticles(): Observable<any> {
    return this.http.get(API_URL + '/articles');
  }
}

