// Body
let bodyElem = document.body;


// Кнопка "Почати розрахунок" 
let startButton = document.querySelector('#start'), 


// Колонка з результатами 
    result = document.querySelector('.result'), 
    budgetValue = result.querySelector('.budget-value'), // Бюджет
    dV = result.querySelector('.daybudget-value'), // Бюджет за день
    lV = result.querySelector('.level-value'),  // Ріваень заробітку
    eV = result.querySelector('.expenses-value'), // Основний дохід
    oV = result.querySelector('.optionalexpenses-value'), // Додаткові витрати
    iV = result.querySelector('.income-value'),     // Способи додаткового доходу
    mV = result.querySelector('.monthsavings-value'), // Бюджет за місяць
    yV = result.querySelector('.yearsavings-value'); // Бюджет за рік
    

// Ввід Основного доходу 
 let expensesItem = document.querySelectorAll('.expenses-item');
    

//  Кнопки 
let btn = document.querySelectorAll('button'),
    expensesItemBtn = btn[0], // Підтвердити №1
    optionalExpensesBtn = btn[1], // Підтвердити №2
    countBtn = btn[2];   // Вирахувати


// Ввід Основного доходу 
let optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item');


// Інші дані
let chooseIncome = document.querySelector('.choose-income'), // Статті додаткового прибутку
    savings = document.querySelectorAll('#savings'), // Чекбокс
    sum = document.querySelector('#sum'), // Сумма
    percent = document.querySelector('#percent'); // Відсоток


// Бюджет на певний проміжок часу
let day = document.querySelector('.day-value'),
    month = document.querySelector('.month-value'),
    year = document.querySelector('.year-value');



// Об'явлення змін
let money;
let time;


startButton.addEventListener('click', function(){
    time = prompt("Введіть дату в форматі YYYY-MM-DD",'');
    money = +prompt("Ваш бюджет на місяць",'');

    while(isNaN(money) || money == null || money == ""){
        money = +prompt("Ваш бюджет на місяць ?", '');
    }

    AppData.budget = money;
    AppData.timeData = time;
    budgetValue.textContent = money.toFixed();

    year.value = new Date(Date.parse(time)).getFullYear();
    month.value = new Date(Date.parse(time)).getMonth() + 1;
    day.value = new Date(Date.parse(time)).getDate();
});


expensesItemBtn.addEventListener('click', function(){
    let sum = 0;

    let i = 0;

    while (i < expensesItem.length) {

        let article = expensesItem[i].value,
        count = expensesItem[++i].value;
    
        if( (typeof(article)) === 'string' && (typeof(article)) != null && article != ''  && (typeof(count)) != null){
            AppData.expenses[article] = count;
            sum += +count;
        } 
    
        else {
            i = i - 1;
        }
        i++;
    }

    eV.textContent = sum;

});

optionalExpensesBtn.addEventListener('click', function(){

    let list = [];

    for (let i = 0; i < optionalExpensesItem.length; i++) {
      let opt = optionalExpensesItem[i].value;
      AppData.optionalExpenses[i] = opt;
      oV.textContent += AppData.optionalExpenses[i] + ' ';
    }
});

countBtn.addEventListener('click', function(){

    if (AppData.budget != undefined) {

        let moneyPerDay = AppData.budget/30,
            level;

        dV.textContent = moneyPerDay.toFixed();

        if (moneyPerDay < 500) {
            level = 'Нє нє нє, шукай щось краще';
        } else if(moneyPerDay == 500){
            level = 'Доволі непогано';
        } else if(moneyPerDay > 500 && moneyPerDay < 1000){
            level = 'Хороший заробіток';
        } else if(moneyPerDay > 1000 && moneyPerDay < 2000){
            level = 'Успішну професію вибрав';
        } else if(moneyPerDay >= 2000){
            level = 'Та ти мільонер';
        } else{
            level = 'Невідома помилка';
        }
        lV.textContent = level;   

    } else{
        alert('Ви не ввели свій дохід');
    }
});

chooseIncome.addEventListener('input', function(){
    let item = chooseIncome.value;
    AppData.income = item.split(', ');
    iV.textContent = AppData.income;
});

// Збереження
savings.addEventListener('click', function(){
   if(AppData.savings == true)  {
        AppData.savings = false;
   } else{
    AppData.savings = true;
   }
});

// Сума
sum.addEventListener('input', function(){
    if(AppData.savings == true){
        let sumValue = +sum.value,
            percentValue = +percent.value;

        AppData.monthInCome = (sumValue/100*percentValue).toFixed(1);

        mV.textContent = AppData.monthInCome * 12;
        yV.textContent = AppData.monthInCome;
    }
});

// Відсоток
percent.addEventListener('input', function(){
    if(AppData.savings == true){
        let sumValue = +sum.value,
            percentValue = +percent.value;

        AppData.monthInCome = (sumValue/100*percentValue).toFixed(1);

        mV.textContent = AppData.monthInCome;
        yV.textContent = AppData.monthInCome * 12;
    }
});

// Об'єкт AppData
let AppData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
};









