import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_ROOT = 'https://conduit.productionready.io/api'
  // API_ROOT = 'http://localhost:4000/api'

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
      ? {
          headers: {
            Authorization: 'Token ' + this.getToken()
          }
        }
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

  getArticles(params: any): Observable<any> {
    return this.http.get(this.API_ROOT + '/articles', { params: Object.assign({ limit: 10}, params) });
  }

  getFeed(params: any): Observable<any> {
    return this.http.get(this.API_ROOT + '/articles/feed', params);
  }

  getArticle(slug: string): Observable<any> {
    return this.http.get(this.API_ROOT + `/articles/${slug}`);
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

  publishArticle(slug: string, body: string): Observable<any> {
    const method = slug ? this.http.put : this.http.post;
    return method(this.API_ROOT + '/articles' + (slug ? '/' + slug : ''), body);
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

  register(body: any): any {
    return this.http.post(this.API_ROOT + `/users`, body);
  }

  login(body: any): any {
    return this.http.post(this.API_ROOT + `/users/login`, body);
  }

  /*
  export const credentialsApi = {
    getUser: () =>
      new Promise((resolve, reject) => {
        if (getToken()) {
          return request('/user', authHeader())
            .then(user => resolve(user.user))
            .catch(reject)
        } else {
          resolve(null)
        }
      })
  }
  */

  getPopularTags(): Observable<any> {
    return this.http.get(this.API_ROOT + '/tags');
  }

  /*
  export const profileApi = {
    get: username => request(`/profiles/${username}`),

    update: body => request('/user', { body, method: 'PUT' }),

    follow: username => request(`/profiles/${username}/follow`, { method: 'POST' }),

    unfollow: username => request(`/profiles/${username}/follow`, { method: 'DELETE' })
  }

  export const loadArticles = params =>
    Promise.all([articlesApi.getList(params), popularTagsApi.getList()]).then(([articles, tags]) =>
      Object.assign(articles, tags)
    )

  export const loadArticle = ({ slug }) =>
    Promise.all([articlesApi.getSingle(slug), articlesApi.getComments(slug)]).then(
      ([article, comments]) => Object.assign(article, comments)
    )
  */
}
