'use strict';

let money, time;

function start() {
    money = +prompt('Ваш бюджет на месяц?', '0');
    time = prompt('Введите дату в формате YYYY-MM-DD', '2019-02-07');

    while(isNaN(money) || money ==""  || money == null) {
        money = +prompt('Ваш бюджет на месяц?', '0');  
    }
}
start();

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: true,
    chooseExpenses: function() {
        for (let i = 0; i < 2; i++) {
            let a = prompt('Введите обязательную статью расходов в этом месяце', ''),
                b = prompt('Во сколько обойдется?', '');
        
                if (typeof(a) === 'string' && typeof(a) != null && typeof(b) != null 
                    && a != '' && b != '' && a.length <50) {
                    console.log('done');
                    appData.expenses[a] = b;
                } else  {
                    i--
                }
        }
    },
    chooseOptExpenses: function() {
        for (let i = 1; i < 4; i++) {
            let a = prompt('Статья необязательных расходов?', ''),
                b = prompt('Во сколько обойдется?', '');
        
                if (typeof(a) === 'string' && typeof(a) != null && typeof(b) != null 
                    && a != '' && b != '' && a.length <50) {
                    console.log('done');
                    appData.optionalExpenses[i] = b;
                } else  {
                    i--
                }
        }
    },
    detectDayBudget: function() {
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        alert("Ежедневный бюджет: " + appData.moneyPerDay + "руб.");
    },
    detectLevel: function() {
        if (appData.moneyPerDay < 100) {
            console.log('Минимальный уровень достатка');
        } else if (appData.moneyPerDay >100 && appData.moneyPerDay < 2000) {
            console.log('Средний уровень достатка');
        } else if (appData.moneyPerDay > 2000) {
            console.log('Высокий уровень достатка');
        } else {
            console.log('Произошла ошибка');
        }
    },
    checkSavings: function() {
        if(appData.savings == true) {
            let save = +prompt("Какова сумма накоплений?"),
                percent = +prompt("Под какой процент?");
    
            appData.monthIncome = save/100/12*percent;
            alert("Доход в месяц с вашего депозита: " + appData.monthIncome);
        }
    },
    chooseIncome: function() {
        /*for (let i = 1; i<2; i++) {*/
            let items = prompt('Что принесет дополнительный доход? (Перечислите через запятую)', '');

            if (typeof(items) != 'string' || typeof(items) == null || items == '') {
                console.log('Вы ввели некорректные данные или не ввели их вовсе');
            } else {
                appData.income = items.split(', ');
                appData.income.push(prompt('Может что-то еще?'));
                appData.income.sort();
            }
       // }
        
        appData.income.forEach(function(a, i) {
            alert("Способы доп. заработка: " + (i+1) + " - " + a);  
        });
    }
};

for (let key in appData) {
    console.log('Наша программа включает в себя данные:' + key + ' is ' + appData[key]);
}

/*let i=0;
while (i < 2) {
    let a = prompt('Введите обязательную статью расходов в этом месяце', ''),
        b = prompt('Во сколько обойдется?', '');

        if ( (typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null 
            && a != '' && b != '' && a.length <50) {
            console.log('done');
            appData.expenses[a] = b;
        } else  {
            i--;
        }
        i++;
};*/

/*let i=0;
do {
    let a = prompt('Введите обязательную статью расходов в этом месяце', ''),
        b = prompt('Во сколько обойдется?', '');

        if ( (typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null 
            && a != '' && b != '' && a.length <50) {
            console.log('done');
            appData.expenses[a] = b;
        } else  {
            i--;
        }
        i++;
}
while (i <2);*/
