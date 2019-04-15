'use strict';

let btnStart = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    inputExpensesItem = document.getElementsByClassName('expenses-item'),
    btnExpItem = document.getElementsByTagName('button')[0],
    btnOptExpItem = document.getElementsByTagName('button')[1],
    btnCountBudget = document.getElementsByTagName('button')[2],
    inputOptExpItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('.checksavings'),
    chooseSum = document.querySelector('.choose-sum'),
    choosePercent = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');


let money, time, sumExp;

btnExpItem.disabled = true;
btnOptExpItem.disabled = true;
btnCountBudget.disabled = true;

btnStart.addEventListener('click', function() {
    
    time = prompt('Введите дату в формате YYYY-MM-DD', '2019-02-07');
    money = +prompt('Ваш бюджет на месяц?', '0');

    while(isNaN(money) || money ==""  || money == null) {
        money = +prompt('Ваш бюджет на месяц?', '0');  
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
	dayValue.value = new Date(Date.parse(time)).getDate();
	
	btnExpItem.disabled = false;
	btnOptExpItem.disabled = false;
	btnCountBudget.disabled = false;
});

btnExpItem.addEventListener('click', function() {
    let sum = 0;

    for (let i = 0; i < inputExpensesItem.length; i++) {
        let a = inputExpensesItem[i].value,
            b = inputExpensesItem[++i].value;
    
            if (typeof(a) === 'string' && typeof(a) != null && typeof(b) != null 
                && a != '' && b != '' && a.length <50) {
                console.log('done');
                appData.expenses[a] = b;
                sum += +b;
            } else  {
                i - 1;
            }
    }
	expensesValue.textContent = sum;
	sumExp = sum
});

btnOptExpItem.addEventListener('click', function() {

    for (let i = 0; i < inputOptExpItem.length; i++) {
        let opt = inputOptExpItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

btnCountBudget.addEventListener('click', function() {

	if (appData.budget != undefined) {
		appData.moneyPerDay = ((appData.budget - sumExp) / 30).toFixed();
		dayBudgetValue.textContent = appData.moneyPerDay;
	
		if (appData.moneyPerDay < 100) {
			levelValue.textContent = 'Минимальный уровень достатка';
		} else if (appData.moneyPerDay >100 && appData.moneyPerDay < 2000) {
			levelValue.textContent = 'Средний уровень достатка';
		} else if (appData.moneyPerDay > 2000) {
			levelValue.textContent = 'Высокий уровень достатка';
		} else {
			levelValue.textContent = 'Произошла ошибка';
		}
	} else {
		dayBudgetValue.textContent = 'Произошла ошибка';
	} 
});

chooseIncome.addEventListener('input', function() {
	let items = chooseIncome.value;
	appData.income = items.split(', ');
	incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function() {
	if (appData.savings == true) {
		appData.savings = false;
	} else {
		appData.savings = true;
	}
});

chooseSum.addEventListener('input', function() {
	if (appData.savings == true) {
		let sum = +chooseSum.value,
			percent = +choosePercent.value;
		appData.monthIncome = sum/100/12*percent;
		appData.yearIncome = sum/100*percent;

		monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
		yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
	}
});

choosePercent.addEventListener('input', function() {
	if (appData.savings == true) {
		let sum = +chooseSum.value,
			percent = +choosePercent.value;
		appData.monthIncome = sum/100/12*percent;
		appData.yearIncome = sum/100*percent;

		monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
		yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
	}
});

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false 
};