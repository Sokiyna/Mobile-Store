'use strict';



function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


let allStores = [];

let allCategories = ['User', 'Type', 'Price', 'Condition'];



function MobileStore(user, type) {

    this.user = user;
    this.type = type;
    this.price = random(100, 500);

    allStores.push(this);

    setStorage();
}



let table = document.getElementById('table');

function header() {

    let trHeader = document.createElement('tr');
    table.appendChild(trHeader);

    for (let i = 0; i < allCategories.length; i++) {

        let tdHeader = document.createElement('td');
        trHeader.appendChild(tdHeader);
        tdHeader.textContent = allCategories[i];
    }


}

MobileStore.prototype.render = function () {

    let trTable = document.createElement('tr');
    table.appendChild(trTable);

    let tdUser = document.createElement('td');
    trTable.appendChild(tdUser);
    tdUser.textContent = `${this.user}`;

    let tdType = document.createElement('td');
    trTable.appendChild(tdType);
    tdType.textContent = `${this.type}`;

    let tdPrice = document.createElement('td');
    trTable.appendChild(tdPrice);
    tdPrice.textContent = `${this.price}`;

    

    let tdCondition = document.createElement('td');
    trTable.appendChild(tdCondition);

    // let condition =['Used', 'New'];

    // for (let i = 0; i < condition.length; i++) {

        if (this.price < 200) {
            tdCondition.textContent ='Used';
        }
        else if (this.price > 200) {
            tdCondition.textContent = 'New';
        }
    // }
};


let form = document.getElementById('form');
form.addEventListener('submit', submitButton);

function submitButton(event) {

    event.preventDefault();

    let user = event.target.user.value;
    let type = event.target.type.value;

    let newObj = new MobileStore(user, type);

    newObj.render();
}



function setStorage() {

    let storage = JSON.stringify('allStores');
    localStorage.setItem('allStores', allStores);
}

function getStorage() {
   
   
    localStorage.getItem('allStores');

    let data = JSON.stringify('allStores');

    let parsedOb = JSON.parse(data);

    if (parsedOb) {

        for (let i = 0; i < parsedOb.length; i++) {

          new MobileStore(parsedOb[i].user, parsedOb[i].type);
        }
    }
}

getStorage();

header();

for (let i = 0; i < allStores.length; i++) {

    allStores[i].render();
}

