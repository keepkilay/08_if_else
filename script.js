let minValue = parseInt(prompt('Минимальное знание числа для игры','0'));
minValue = (!isNaN(minValue)) ? minValue : 0;
let maxValue = parseInt(prompt('Максимальное знание числа для игры','100'));
maxValue = (!isNaN(maxValue)) ? maxValue : 100;
minValue = (minValue < -999) ? -999 : minValue;
maxValue = (maxValue > 999) ? 999 : maxValue;

let runElem = [];
runElem[0] = new Array("", "один", "два", "три", "четыри", "пять", "шесть", "семь","восемь", "девять");

runElem["d"] = new Array("десять", "одинадцать", "двенадцать", "тринадцать", "четырнадцать","пятнадцать", "шеснадцать", "семнадцать", "восемнадцать", "девятнадцать");

runElem[1] = new Array("", "", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят","семьдесят", "восемьдесят", "девяносто");

runElem[2] = new Array("", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот","семьсот", "восемьсот", "девятьсот");

runElem["s"] = new Array("", "одна", "две");

runElem[3] = new Array("тысяч", "тысяча", "тысячи", "тысячи", "тысячи", "тысяч", "тысяч","тысяч", "тысяч", "тысяч", "");

function numToWord(number) {


    let defNumber = number;


    let horp = "",

        numArr = [],

        flag = true;

    // Checking the input conditions

    if (isNaN(number)) {
        return "Invalid input!";
    }

    // Convert input number to array of digits

    for (; number != 0; number = Math.floor(number / 10)) {

        numArr.push(number % 10);

    }

    // Iterate all digits from the end

    for (var i = numArr.length - 1; i >= 0 ; i--) {

        if (flag) {

            if (numArr[i] == 1 && i == 1 || numArr[i] == 1 && i == 4) {

                flag = false;

            } else {

                horp += digitToWord(i, numArr[i], 0);

            }

        } else {

            horp += digitToWord("d", numArr[i], i);

            flag = true;

        }

    }

console.log(horp.trim().length);    
    if (horp.trim ().length > 20) {
        return defNumber;
    } else {
        return horp.trim();
    }



}

function digitToWord(digit, offset, char) {

    let horp = "";

    switch (digit) {

        case 3:

            horp += (offset == 1 || offset == 2 ? runElem["s"][offset] : runElem[0][offset]) + " ";

            break;

        case 4:

            digit = 1;

            break;

        case "d":

            horp += runElem[digit][offset] + " ";

            digit = char;

            offset = 0;

            break;

    }

    return horp + runElem[digit][offset] + " ";

}


alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
let answerNumber  = Math.floor((minValue + maxValue) / 2);
let answerNumberText  = numToWord(answerNumber);
let orderNumber = 1;
let gameRun = true;
let psblMsg = [
    `Возможно это не то число?\n\u{1F914}`,
    `Я сдаюсь..\n\u{1F92F}`,
    `Скорее всего ты загадал..\n\u{1F92F}`,
];

let possibleNumber = [
    `Вы загадали число `,
    `Наверное, это число `,
    `Да это легко, ты загадал `,
];

const orderNumberField = document.querySelector('#orderNumberField');
const answerField = document.querySelector('#answerField');

orderNumberField.innerText = orderNumber;
answerField.innerText = possibleNumber[Math.floor(Math.random() * possibleNumber.length)] + answerNumberText +`?`;

document.querySelector('#btnRetry').addEventListener('click', function () {
    minValue = 0;
    maxValue = 100;
    orderNumber = 0;
    location.reload();
})


function isError(){
    const answerPhraseNumberRandom = Math.floor(Math.random() * psblMsg.length);
    const answerPhrase = psblMsg[answerPhraseNumberRandom];
    answerField.innerText = answerPhrase;
    gameRun = false;
}

document.querySelector('#btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            isError();
        } else {
            minValue = answerNumber + 1;
            if (minValue === maxValue){
                isError();
            }else{
                answerNumber  = Math.floor((minValue + maxValue) / 2);
                answerNumberText = numToWord(answerNumber);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                answerField.innerText = possibleNumber[Math.round(Math.random() * possibleNumber.length)] + answerNumberText +`?`;
            }

        }
    }
    console.log('minValue',minValue);
    console.log('maxValue',maxValue);
})

document.querySelector('#btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            isError();
        } else {
            maxValue = answerNumber + 0;
            if (minValue === maxValue){
                isError();
            }else{
                answerNumber = Math.floor(Math.random() * (maxValue - minValue) + minValue);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                answerNumberText = numToWord(answerNumber);
                answerField.innerText = possibleNumber[Math.floor(Math.random() * possibleNumber.length)] + answerNumberText +`?`;
            }
        }
    }
    console.log('minValue',minValue);
    console.log('maxValue',maxValue);
})

document.querySelector('#btnEqual').addEventListener('click', function () {
    if (gameRun){
        answerField.innerText = `Я всегда угадываю\n\u{1F60E}`
        gameRun = false;
    }
})



