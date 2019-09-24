import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from '../model/profile.model';
import { ArticleList } from '../model/article-list.model';
import { User } from '../model/user.model';
import { Article } from '../model/article.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_ROOT = 'https://conduit.productionready.io/api';
  // API_ROOT = 'http://localhost:4000/api';

  constructor(private http: HttpClient) { }

  private getToken(): string {
    return localStorage.getItem('jwt');
  }

  setToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  clearToken(): void {
    localStorage.removeItem('jwt');
  }

  private authHeader(): any {
    return this.getToken()
      ? { Authorization: 'Token ' + this.getToken() }
      : {};
  }

  /*
  const request = (url, options) =>
    m
      .request(Object.assign(options || {}, { url: API_ROOT + url }, authHeader()))
      .then(response => (response && response.data) || response)

  Parameters:

  Filter by tag:
  ?tag=AngularJS

  Filter by author:
  ?author=jake

  Favorited by user:
  ?favorited=jake

  Limit number of articles (default is 20):
  ?limit=10

  Offset/skip number of articles (default is 0):
  ?offset=0

  Returns:

  {
    articles,
    articlesCount
  }
  */

  getArticles(params: any): Observable<ArticleList> {
    const uri = '/articles' + (params.feed ? '/feed' : '');
    delete params.feed;
    return this.http.get<ArticleList>(this.API_ROOT + uri, { params, headers: this.authHeader() });
  }

  getArticle(slug: string): Observable<Article> {
    return this.http.get(this.API_ROOT + `/articles/${slug}`).pipe(map((response: any) => response.article));
  }

  getComments(slug: string): Observable<any> {
    return this.http.get(this.API_ROOT + `/articles/${slug}/comments`);
  }

  addComment(slug: string, body: string): Observable<any> {
    return this.http.post(this.API_ROOT + `/articles/${slug}/comments`, body);
  }

  deleteComment(slug: string, id: string): Observable<any> {
    return this.http.delete(this.API_ROOT + `/articles/${slug}/comments/${id}`);
  }

  publishArticle(slug: string, body: any): Observable<any> {
    return slug
      ? this.http.put(this.API_ROOT + `/articles/${slug}`, body, { headers: this.authHeader() })
      : this.http.post(this.API_ROOT + '/articles', body, { headers: this.authHeader() });
  }

  unpublishArticle(slug: string): Observable<any> {
    return this.http.delete(this.API_ROOT + `/articles/${slug}`);
  }

  favoriteArticle(slug: string): Observable<any> {
    return this.http.post(this.API_ROOT + `/articles/${slug}/favorite`, null);
  }

  unfavoriteArticle(slug: string): Observable<any> {
    return this.http.delete(this.API_ROOT + `/articles/${slug}/favorite`);
  }

  register(body: any): Observable<any> {
    return this.http.post(this.API_ROOT + `/users`, body);
  }

  login(body: any): Observable<any> {
    return this.http.post(this.API_ROOT + `/users/login`, body);
  }

  getUser(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      if (this.getToken()) {
        return this.http.get(this.API_ROOT + '/user', { headers: this.authHeader() })
          .subscribe(
            (user: any) => resolve(user.user),
            reject
          );
      } else {
        resolve(null);
      }
    });
  }

  getPopularTags(): Observable<any> {
    return this.http.get(this.API_ROOT + '/tags');
  }

  getProfile(username: string): Observable<Profile> {
    return this.http.get(this.API_ROOT + `/profiles/${username}`) as Observable<Profile>;
  }

  updateProfile(body: any): Observable<any> {
    return this.http.put(this.API_ROOT + '/user', body);
  }

  followUser(username: string): Observable<any> {
    return this.http.post(this.API_ROOT + `/profiles/${username}/follow`, null);
  }

  unfollowUser(username: string): Observable<any> {
    return this.http.delete(this.API_ROOT + `/profiles/${username}/follow`);
  }
}
