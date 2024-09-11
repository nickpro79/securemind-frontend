import { HttpInterceptorFn,HttpRequest,HttpHandlerFn, HttpEvent,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export const authInterceptor:HttpInterceptorFn = (req,next): Observable<HttpEvent<unknown>> => {
  const token = localStorage.getItem('AuthenticationToken'); 

  const authReq = token ? req.clone({
    headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
  }) : req;
  console.log(authReq.headers)
  return next(authReq);
}
