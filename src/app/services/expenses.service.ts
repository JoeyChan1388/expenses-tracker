import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Expense from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  constructor(private http:HttpClient) {}

  getMonthsData() {
    return this.http.get<any>('http://localhost:3000/months');
  }

  getMonthData(month: number) {
    return this.http.get<any>(`http://localhost:3000/months/${month}`);
  }

  // Update month data taking in the new month data which will likely be the same as the old month data but with changes to expenses
  updateMonth(month:number, newData:any) {
    console.log(newData);
    return this.http.put<any>(`http://localhost:3000/months/${month}`, newData);
  }
}
