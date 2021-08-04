import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  expenseTypeList = [];
  expenseTypeId; amount; month; year;
  constructor(private dataService: DataServiceService) { }

  ngOnInit() {
    this.dataService.getExpenseType()
      .subscribe((data: any) => {
        this.expenseTypeList = data;
        console.log(this.expenseTypeList);
      }
    );
  }

  expenseForm(form: NgForm) {
    console.log(form.value);
    const object = {
      amount: form.value.amount,
      expenseTypeId: parseInt(form.value.expenseTypeId, 10),
      month: parseInt(form.value.month, 10),
      year: parseInt(form.value.year, 10)
    };
    this.dataService.postExpense(object)
      .subscribe((data: any) => {
        console.log(data);
      }
    );
  }

}
