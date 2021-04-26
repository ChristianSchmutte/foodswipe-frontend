import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'http://localhost:8080/restaurants';

  private httpOptions = {
    headers: { 'Content-Type' : 'application/json '}
  };

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) {
    const result = this.http.post(
      `${this.baseUrl}/login`,
      { email, password },
      this.httpOptions,
    )

    result.subscribe(r => console.log(r));
  }
}
