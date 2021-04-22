import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticate(username, password): Observable<any> {
    return this.httpClient
      .post("http://localhost:8595/springboot-rest-api/login", 
                  { username, password },
                  {observe: 'response'})
      .pipe(
        map(resp => {
          console.log('loginResp: ', resp.headers.get('authorization'));
          sessionStorage.setItem("username", username);
          let tokenStr = "Bearer " + resp.headers.get('authorization');
          console.log("tokenStr: ", tokenStr);
          sessionStorage.setItem("token", tokenStr);

          return resp;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("username");
  }

}
