import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { StepResponseModel } from './models/step-response.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = `https://uqnzta2geb.execute-api.us-east-1.amazonaws.com/default/FrontEndCodeChallenge`;

  constructor(private http: HttpClient) {}

  getSteps$() {
    return this.http.get<StepResponseModel[]>(this.apiUrl);
  }
}
