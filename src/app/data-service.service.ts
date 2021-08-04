import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  baseURL = 'http://localhost:25517/';

  constructor(private router: Router, private http: HttpClient) {
  }

  getCost(year) {
    return this.http.get(this.baseURL + 'api/Reconciliation/GetMonthlyExpensesByYear/' + year);
  }

  getIncome(year) {
    return this.http.get(this.baseURL + 'api/Reconciliation/GetMonthlyIncomesByYear/' + year);
  }

  getMonthlyTypeWiseIncomesByYear(year) {
    return this.http.get(this.baseURL + 'api/Reconciliation/GetMonthlyTypeWiseIncomesByYear/' + year);
  }

  getMonthlyTypeWiseExpenseByYear(year) {
    return this.http.get(this.baseURL + 'api/Reconciliation/GetMonthlyTypeWiseExpensesByYear/' + year);
  }

  getIncomeType() {
    return this.http.get(this.baseURL + 'api/Reconciliation/GetIncomeTypes');
  }

  getExpenseType() {
    return this.http.get(this.baseURL + 'api/Reconciliation/GetExpenseTypes');
  }

  postIncome(model) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };
    return this.http.post(this.baseURL + 'api/Incomes', model, httpOptions);
  }

  postExpense(model) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };
    return this.http.post(this.baseURL + 'api/Expenses', model, httpOptions);
  }
}
