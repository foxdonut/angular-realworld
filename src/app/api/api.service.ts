import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from '../model/profile.model';
import { ArticleList } from '../model/article-list.model';
import { User } from '../model/user.model';
import { Article } from '../model/article.model';
import { Comment } from '../model/comment.model';

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

  getAuthorization(): string {
    return this.getToken()
      ? 'Token ' + this.getToken()
      : '';
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
    return this.http.get<ArticleList>(this.API_ROOT + uri, { params });
  }

  getArticle(slug: string): Observable<Article> {
    return this.http.get(this.API_ROOT + `/articles/${slug}`)
      .pipe(map((response: any) => response.article));
  }

  getComments(slug: string): Observable<Comment[]> {
    return this.http.get(this.API_ROOT + `/articles/${slug}/comments`)
      .pipe(map((response: any) => response.comments));
  }

  addComment(slug: string, body: string): Observable<any> {
    return this.http.post(this.API_ROOT + `/articles/${slug}/comments`, { comment: { body } });
  }

  deleteComment(slug: string, id: string): Observable<any> {
    return this.http.delete(this.API_ROOT + `/articles/${slug}/comments/${id}`);
  }

  publishArticle(slug: string, body: any): Observable<any> {
    return slug
      ? this.http.put(this.API_ROOT + `/articles/${slug}`, body)
      : this.http.post(this.API_ROOT + '/articles', body);
  }

  unpublishArticle(slug: string): Observable<any> {
    return this.http.delete(this.API_ROOT + `/articles/${slug}`);
  }

  toggleFavoriteArticle(article: Article): Observable<Article> {
    const slug = article.slug;
    return (article.favorited
      ? this.http.delete(this.API_ROOT + `/articles/${slug}/favorite`)
      : this.http.post(this.API_ROOT + `/articles/${slug}/favorite`, null)
    ).pipe(map((response: any) => response.article));
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
        return this.http.get(this.API_ROOT + '/user')
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
    return this.http.get(this.API_ROOT + `/profiles/${username}`)
      .pipe(map((response: any) => response.profile));
  }

  updateUser(user: any): Observable<User> {
    return this.http.put(this.API_ROOT + '/user', { user })
      .pipe(map((response: any) => response.user));
  }

  toggleFollowProfile(profile: Profile): Observable<Profile> {
    const username = profile.username;
    return (profile.following
      ? this.http.delete(this.API_ROOT + `/profiles/${username}/follow`)
      : this.http.post(this.API_ROOT + `/profiles/${username}/follow`, null)
    ).pipe(map((response: any) => response.profile));
  }
}
