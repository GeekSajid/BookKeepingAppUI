import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  incomeTypeList = [];
  incomeTypeId; amount; month; year;
  constructor(private dataService: DataServiceService) { }

  ngOnInit() {
    this.dataService.getIncomeType()
      .subscribe((data: any) => {
        this.incomeTypeList = data;
        console.log(this.incomeTypeList);
      }
    );
  }

  incomeForm(form: NgForm) {
    console.log(form.value);
    const object = {
      amount: form.value.amount,
      incomeTypeId: parseInt(form.value.incomeTypeId, 10),
      month: parseInt(form.value.month, 10),
      year: parseInt(form.value.year, 10)
    };
    this.dataService.postIncome(object)
      .subscribe((data: any) => {
        console.log(data);
      }
    );
  }

}
