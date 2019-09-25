import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { ApiService } from './api.service';

export class HeadersInterceptor implements HttpInterceptor {

  constructor(private api: ApiService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authorization = this.api.getAuthorization();
    const reqWithHeaders = req.clone({
      headers: req.headers.append('Authorization', authorization)
    });
    return next.handle(reqWithHeaders);
  }
}
