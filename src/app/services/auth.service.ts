import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const  BASE_URL = 'http://localhost:3000/api/letsgossip';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    registerUser(body): Observable<any> {
        return this.http.post(`${BASE_URL}/register`, body);
    }

    loginUser(body): Observable<any> {
        return this.http.post(`${BASE_URL}/login`, body);
    }

}
