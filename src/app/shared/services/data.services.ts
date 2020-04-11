import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Constants } from '../utils/constants';
import { Observable } from 'rxjs/Observable';
import { CreateItemResponse } from '../models/app.models';
@Injectable()
export class DataService {
    constructor(private httpClient: HttpClient) {
    }
    public exchangePublicToken(publicToken: string): Observable<string> {
        const url = Constants.BASE_URL + Constants.EXCHANGE_PUBLIC_TOKEN;
        const requestBody = {
            "client_id": Constants.CLIENT_ID,
            "secret": Constants.SECRET,
            "public_token": publicToken
        }
        
        return this.httpClient.post<string>(url, requestBody);
    }
    public getCreateItemResponse(): Observable<CreateItemResponse> {
        return this.httpClient.get<CreateItemResponse>('assets/CreateItemResponse.json');
    }
}