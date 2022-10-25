import { Component, OnInit } from '@angular/core';
import Expense from 'src/app/models/expense';
import { ExpensesService } from 'src/app/services/expenses.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-expenses-tracker',
  templateUrl: './expenses-tracker.component.html',
  styleUrls: ['./expenses-tracker.component.css'],
})
export class ExpensesTrackerComponent implements OnInit {
  date: number = new Date().getMonth() + 1;
  monthData: any = [];
  expenses: Expense[] = [];

  constructor(private expensesService: ExpensesService) {}

  ngOnInit(): void {
    this.expensesService.getMonthData(this.date).subscribe((month) => {
      this.monthData = month;
      this.expenses = this.monthData.expenses;
    });
  }

  addExpense(expense: Expense) {
    // Add the expense to the expenses array to be updated in the server
    expense.id = this.expenses.length + 1;
    this.expenses.push(expense);

    // Update the month data expense array to be sent to the server
    this.monthData.expenses = this.expenses;

    // Update the month data based on month in the server
    this.expensesService
      .updateMonth(this.date, this.monthData)
      .subscribe((month) => {
        this.monthData = month;
        this.expenses = this.monthData.expenses;
      });
  }

  deleteExpense(expense: Expense) {
    const confirmDelete = confirm(
      'Are you sure you want to delete this expense?'
    );

    if (confirmDelete) {
      // Delete the expense from the expenses array to be updated in the server
      this.expenses = this.expenses.filter((e) => e.id !== expense.id);

      // Update the month data expense array to be sent to the server
      this.monthData.expenses = this.expenses;

      // Update the month data based on month in the server
      this.expensesService
        .updateMonth(this.date, this.monthData)
        .subscribe((month) => {
          this.monthData = month;
          this.expenses = this.monthData.expenses;
        });
    }
  }

  getTotalExpenses() {
    let totalExpenses: number = 0;

    for (let expense of this.expenses) {
      totalExpenses += expense.amount;
    }

    return totalExpenses;
  }

  incrementMonth() {
    this.date = this.date + 1;

    if (this.date > 11) {
      this.date = 0;
    }

    // Update the month data based on month
    this.expensesService.getMonthData(this.date).subscribe((month) => {
      this.monthData = month;
      this.expenses = this.monthData.expenses;
      console.log(this.expenses);
    });
  }

  decrementMonth() {
    this.date = this.date - 1;

    if (this.date < 0) {
      this.date = 11;
    }

    // Update the month data based on month
    this.expensesService.getMonthData(this.date).subscribe((month) => {
      this.monthData = month;
      this.expenses = this.monthData.expenses;
      console.log(this.expenses);
    });
  }
}
