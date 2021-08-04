import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';



@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.css']
})
export class TemplateDrivenComponent implements OnInit {

  costList = []; incomeList = []; costIncomeResultList = [];
  typeIncomeList = []; newIncomeList = [];
  typeExpenseList = []; newExpenseList = [];
  incomeTypeNameList = []; expenseTypeNameList = [];
  reconcialiotionResultList = []; finalResult = [];
  year;
  month = []; monthFinalResult = [];

  constructor(private dataservice: DataServiceService) {

  }

  ngOnInit() {
    const date = new Date();
    this.year = date.getFullYear();
    this.emptyObjectMonth();
    this.emptyObjectMonthResult();
    this.getNameOfIncomeExpense();
    this.getAllIncome(this.year);
    this.getAllCost(this.year);
    this.getTypeWiseIncome(this.year);
    this.getTypeWiseExpense(this.year);
  }

  getAllCost(year) {
    this.dataservice.getCost(year)
      .subscribe((data: any) => {
        this.costList = [];
        this.costList = data;
        console.log(this.costList);
        setTimeout(() => {
          this.resultIncomeCost();
        }, 500);
      }
    );
  }

  getAllIncome(year) {
    this.dataservice.getIncome(year)
      .subscribe((data: any) => {
        this.incomeList = [];
        this.incomeList = data;
        console.log(this.incomeList);
      }
    );
  }

  resultIncomeCost() {
    this.costIncomeResultList = [];
    for (let i = 0; i < 12; i++) {
      const amount = this.incomeList[i].amount - this.costList[i].amount;
      this.costIncomeResultList.push(amount);
    }
    console.log(this.costIncomeResultList);
  }

  getTypeWiseIncome(year) {
    this.dataservice.getMonthlyTypeWiseIncomesByYear(year)
      .subscribe((data: any) => {
        this.typeIncomeList = [];
        this.typeIncomeList = data;
        setTimeout(() => {
          this.filterTypeIncomeLists();
        }, 500);
        console.log(data);
      }
    );
  }

  getTypeWiseExpense(year) {
    this.dataservice.getMonthlyTypeWiseExpenseByYear(year)
      .subscribe((data: any) => {
        this.typeExpenseList = [];
        this.typeExpenseList = data;
        setTimeout(() => {
          this.filterTypeExpenseLists();
        }, 500);
        console.log(data);
      }
    );
  }

  getNameOfIncomeExpense() {
    this.dataservice.getIncomeType()
      .subscribe((data: any) => {
        this.incomeTypeNameList = [];
        this.incomeTypeNameList = data;
        console.log(this.incomeTypeNameList);
      }
    );

    this.dataservice.getExpenseType()
      .subscribe((data: any) => {
        this.expenseTypeNameList = [];
        this.expenseTypeNameList = data;
        console.log(this.expenseTypeNameList);
      }
    );
  }

  filterTypeIncomeLists() {
    this.newIncomeList = [];
    let type;
    for (let i = 1; i <= this.incomeTypeNameList.length; i++) {
      type = this.typeIncomeList.filter(data => data.incomeTypeId === i);
      this.newIncomeList.push(type);
    }
    console.log(this.newIncomeList);
  }

  filterTypeExpenseLists() {
    this.newExpenseList = [];
    let type;
    for (let i = 1; i <= this.expenseTypeNameList.length; i++) {
      type = this.typeExpenseList.filter(data => data.expenseTypeId === i);
      this.newExpenseList.push(type);
    }
    console.log(this.newExpenseList);
    setTimeout(() => {
      this.incomeAddition();
    }, 500);
  }

  incomeAddition() {
    this.emptyObjectMonth();
    for (let i = 0; i < this.newIncomeList.length; i++) {
      for (let j = 0; j < this.newIncomeList[i].length; j++) {
        if (this.newIncomeList[i][j].month === 1) {
          this.month[0].amount += this.newIncomeList[i][j].amount;
        } else if (this.newIncomeList[i][j].month === 2) {
          this.month[1].amount += this.newIncomeList[i][j].amount;
        } else if (this.newIncomeList[i][j].month === 3) {
          this.month[2].amount += this.newIncomeList[i][j].amount;
        } else if (this.newIncomeList[i][j].month === 4) {
          this.month[3].amount += this.newIncomeList[i][j].amount;
        } else if (this.newIncomeList[i][j].month === 5) {
          this.month[4].amount += this.newIncomeList[i][j].amount;
        } else if (this.newIncomeList[i][j].month === 6) {
          this.month[5].amount += this.newIncomeList[i][j].amount;
        } else if (this.newIncomeList[i][j].month === 7) {
          this.month[6].amount += this.newIncomeList[i][j].amount;
        } else if (this.newIncomeList[i][j].month === 8) {
          this.month[7].amount += this.newIncomeList[i][j].amount;
        } else if (this.newIncomeList[i][j].month === 9) {
          this.month[8].amount += this.newIncomeList[i][j].amount;
        } else if (this.newIncomeList[i][j].month === 10) {
          this.month[9].amount += this.newIncomeList[i][j].amount;
        } else if (this.newIncomeList[i][j].month === 11) {
          this.month[10].amount += this.newIncomeList[i][j].amount;
        } else if (this.newIncomeList[i][j].month === 12) {
          this.month[11].amount += this.newIncomeList[i][j].amount;
        }
      }
    }
    console.log(this.month);
    this.expenseAddition();
  }

  expenseAddition() {
    this.emptyObjectMonthResult();
    for (let i = 0; i < this.newExpenseList.length; i++) {
      for (let j = 0; j < this.newExpenseList[i].length; j++) {
        if (this.newExpenseList[i][j].month === 1) {
          this.monthFinalResult[0].amount += this.newExpenseList[i][j].amount;
        } else if (this.newExpenseList[i][j].month === 2) {
          this.monthFinalResult[1].amount += this.newExpenseList[i][j].amount;
        } else if (this.newExpenseList[i][j].month === 3) {
          this.monthFinalResult[2].amount += this.newExpenseList[i][j].amount;
        } else if (this.newExpenseList[i][j].month === 4) {
          this.monthFinalResult[3].amount += this.newExpenseList[i][j].amount;
        } else if (this.newExpenseList[i][j].month === 5) {
          this.monthFinalResult[4].amount += this.newExpenseList[i][j].amount;
        } else if (this.newExpenseList[i][j].month === 6) {
          this.monthFinalResult[5].amount += this.newExpenseList[i][j].amount;
        } else if (this.newExpenseList[i][j].month === 7) {
          this.monthFinalResult[6].amount += this.newExpenseList[i][j].amount;
        } else if (this.newExpenseList[i][j].month === 8) {
          this.monthFinalResult[7].amount += this.newExpenseList[i][j].amount;
        } else if (this.newExpenseList[i][j].month === 9) {
          this.monthFinalResult[8].amount += this.newExpenseList[i][j].amount;
        } else if (this.newExpenseList[i][j].month === 10) {
          this.monthFinalResult[9].amount += this.newExpenseList[i][j].amount;
        } else if (this.newExpenseList[i][j].month === 11) {
          this.monthFinalResult[10].amount += this.newExpenseList[i][j].amount;
        } else if (this.newExpenseList[i][j].month === 12) {
          this.monthFinalResult[11].amount += this.newExpenseList[i][j].amount;
        }
      }
    }
    console.log(this.monthFinalResult);
    this.getReconcialiotionResult();
  }

  getReconcialiotionResult() {
    this.reconcialiotionResultList = [];
    for (let i = 0; i < 12; i++) {
      const amount = this.month[i].amount - this.monthFinalResult[i].amount;
      this.reconcialiotionResultList.push(amount);
    }
    console.log(this.reconcialiotionResultList);
    setTimeout(() => {
      this.finalResultList();
    }, 500);
  }

  finalResultList() {
    this.finalResult = [];
    for (let i = 0; i < 12; i++) {
      const amount = this.reconcialiotionResultList[i] + this.costIncomeResultList[i];
      this.finalResult.push(amount);
    }
    console.log(this.finalResult);
  }

  toggleYear(data) {
    this.year = parseInt(data, 10);
    console.log(this.year);
    this.getNameOfIncomeExpense();
    this.getAllIncome(this.year);
    this.getAllCost(this.year);
    this.getTypeWiseIncome(this.year);
    this.getTypeWiseExpense(this.year);
  }

  onChangeIncome(i, j, data) {
    console.log(i);
    console.log(j);
    console.log(data);
    this.newIncomeList[i][j].amount = data.amount;
    console.log(this.newIncomeList);
    this.incomeAddition();
  }

  onChangeExpense(i, j, data) {
    console.log(i);
    console.log(j);
    console.log(data);
    this.newExpenseList[i][j].amount = data.amount;
    console.log(this.newExpenseList);
    this.incomeAddition();
  }

  emptyObjectMonth() {
    this.month = [
      {
        amount: 0
      },
      {
        amount: 0
      },
      {
        amount: 0
      },
      {
        amount: 0
      },
      {
        amount: 0
      },
      {
        amount: 0
      },
      {
        amount: 0
      },
      {
        amount: 0
      },
      {
        amount: 0
      },
      {
        amount: 0
      },
      {
        amount: 0
      },
      {
        amount: 0
      },
    ];
  }

  emptyObjectMonthResult() {
    this.monthFinalResult = [
      {
        amount: 0
      },
      {
        amount: 0
      },
      {
        amount: 0
      },
      {
        amount: 0
      },
      {
        amount: 0
      },
      {
        amount: 0
      },
      {
        amount: 0
      },
      {
        amount: 0
      },
      {
        amount: 0
      },
      {
        amount: 0
      },
      {
        amount: 0
      },
      {
        amount: 0
      },
    ];
  }

}
