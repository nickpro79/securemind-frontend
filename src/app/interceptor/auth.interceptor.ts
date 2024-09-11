import { HttpInterceptorFn,HttpRequest,HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


export const authInterceptor:HttpInterceptorFn = (req,next): Observable<HttpEvent<unknown>> => {
  console.log(req.headers);
  return next(req);
}
