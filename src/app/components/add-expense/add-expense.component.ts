import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import Expense from 'src/app/models/expense';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
  // Event emitter for outputting an Expense object to the parent component
  @Output() newExpenseEvent = new EventEmitter<Expense>();

  expenseToBeAdded:Expense = new Expense(0, '', '', 0);
  constructor() { }

  ngOnInit(): void {
  }

  clearInput() {
    (document.querySelector('#amount') as HTMLInputElement).value = '';
  }

  addNewExpense() {
    if(this.expenseToBeAdded.title == '') {
      alert('Please enter a title');
    } else if(this.expenseToBeAdded.amount < 0) {
      alert('Expense amount must not be negative');
    } else {
      this.newExpenseEvent.emit(this.expenseToBeAdded);
      // Reset the expense object or else it will mess with the next expense
      this.expenseToBeAdded = new Expense(0, '', '', 0);

      (document.querySelector('#title') as HTMLInputElement).value = '';
      (document.querySelector('#description') as HTMLInputElement).value = '';
      (document.querySelector('#amount') as HTMLInputElement).value = '0';
    }
  }
}
