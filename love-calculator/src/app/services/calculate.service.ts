import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class CalculateService {

    constructor(private http: HttpClient) { }

    getLoveScore(_firstPersonName: string, _secondPersonName: string) {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        return this.http.get(`http://localhost:3000/api/perfectmatch/${_firstPersonName}/${_secondPersonName}`, {
            headers: headers,
            observe: 'response'
        });
    }

}
