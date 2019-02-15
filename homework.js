// // -------------------------- Home work --------------------------
// // -------------------------- ФИО --------------------------
// Замыкания. Задачи.
// 1. Есть класс Planet
function Planet(name) {
    this.name = name;
    this.getName = function() {
        return 'Planet name is ' + this.name;
    }
}
// Создать наследника от Planet, который будет называться PlanetWithSatellite и будет
// принимать, кроме name, название спутника (satelliteName). Переопределите метод
// getName для PlanetWithSatellite так, чтобы он возвращал ту же самую строчку +
// дополнительный текст 'The satellite is' + satelliteName.
Planet.prototype.getName = new Planet().getName; 

function PlanetWithSatellite(name, satelliteName) {
    Planet.call(this, name);            //привязуємо  спадкоємця до батьківського елемента
    this.satelliteName = satelliteName; // нова властивість
    this.getName = function() {
        return new Planet(this.name).getName() + '. The satellite is ' + this.satelliteName; //переписуємо метод 
    }
}


let earth = new PlanetWithSatellite('earth', 'moon');

let jupiter = new PlanetWithSatellite('Jupiter', 'Callisto'); 


// 2. Создайте класс “Здание” (пусть у него будет имя, количество этажей, 
//     метод “получить количество этажей” и метод “установить количество этажей”).
//     Создайте наследников этого класса:
//     классы “Жилой дом” и “Торговый центр”. Используйте функциональное наследование 
function Building(name, floors) {
    this.name = name;
    this.floors = floors;
    this.getFloors = function() {
        return this.floors;
    };
    this.setFloors = function(floorsCount) {
        return this.floors = floorsCount;
    }
}

let building = new Building('B-13', 5);
// У жилого дома появится свойство “количество квартир на этаже”, а метод “получить количество этажей” 
// должен вернуть объект вида {этажи: 5, всегоКвартир: 5 * количествоКвартир}
function Home(name, floors, apartments) {
    Building.call(this, name, floors);
    this.apartmentsOnFloor = apartments;
    this.apartmentsCount = function() {
        return {
            floors: this.floors,
            totallApartments: this.floors * this.apartmentsOnFloor
        }
    }
} 

let home = new Home('Lord Palace', 5, 3);
// У торгового центра появится свойство “количество магазинов на этаже”, 
// а метод “получить количество этажей” должен вернуть объект вида {этажи: 3, всегоМагазинов: 3 * количествоМагазинов}
// От каждого класса создать экземпляр (дом, торговый центр)

function ShoppingСenter(name, floors, shops) {
    Building.call(this, name, floors);
    this.shopsOnFloor = shops;
    this.shopCount = function() {
        return {
            floors: this.floors,
            totallShops: this.floors * this.shopsOnFloor
        }
    }
}

let caravan = new ShoppingСenter('Caravan', 4, 5);

// 3. Создать класс “Мебель” с базовыми свойствами “имя”, “цена” и методом “получить информацию” 
// (метод должен вывести имя и цену). Метод должен быть объявлен с помощью прототипов (Func.prototype...). 
// Создать два экземпляра класса “Мебель”: экземпляр “ОфиснаяМебель” и
// “Мебель для дома”. Придумайте им по одному свойству, которые будут характерны только для этих экземпляров 
// (например, для офисной мебели - наличие компьютерного стола или шредера). 
// Метод “получить информацию” должен учитывать и добавленное вами новое свойство.
// Задача на переопределение метода у экземпляров класса.

function Furniture(name, price) {
    this.name = name;
    this.price = price;
}

Furniture.prototype.getInfo = function() {
    return { 
        name: this.name,
        price: this.price
    };
}

let furniture = new Furniture('Comod', 1000);

let computerChair = new Furniture('Chair', 1500);
computerChair.description = 'computer chair';
computerChair.getInfo = function() {
    let info = Furniture.prototype.getInfo.call(this);
    info.description = this.description;
    return info;
}
let commode = new Furniture('Commode', 500);
commode.description = 'commode for sleeping room';
commode.getInfo = function() {
    let info = Furniture.prototype.getInfo.call(this);
    info.description = this.description;
    return info;
}

// 4. Создать класс “Пользователь” с базовыми свойствами “имя”, “дата регистрации” и методом “получить информацию” 
// (метод должен вывести имя и дату регистрации). Метод должен быть объявлен с помощью прототипов (Func.prototype...) 
// Создать два наследника класса “Пользователь”: класс “Админ” и класс “Гость”.
// У класса “Админ” должно быть дополнительное свойство “суперАдмин” (может быть
// true/false, должно быть скрытым). Свойства определяются в момент вызова
// конструктора.
// У класса “Гость” должно быть свойство “срокДействия” (validDate, например), содержащее дату (например, одну неделю от момента регистрации).
// У классов-наследников метод “получить информацию” должен так же содержать информацию о дополнительных свойствах (“суперАдмин” и “срокДействия”)

let User = function(name, date) {
    this.name = name;
    this.dateOfRegistration = date;
}

User.prototype.getInfo = function() {
    console.log(this.name, this.dateOfRegistration);
}

let user = new User('Ivan', 21.05);

let Admin = function(name, date, sup) {
    User.call(this, name, date);
    superAdmin = sup;
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;


let admin = new Admin('Ivan', 21.05, true);

Admin.prototype.getInfo = function() {
    User.prototype.getInfo.call(this);
    console.log('Super admin: ' + superAdmin);
}.bind(admin);

let Guest = function(name, date, valid) {
    User.call(this, name, date);
    this.validDate = valid;
}
Guest.prototype = Object.create(Guest.prototype);
Guest.prototype.constructor = Guest;

let guest = new Guest('Kolya', 25.04, 25.06);

Guest.prototype.getInfo = function() {
    User.prototype.getInfo.call(this);
    console.log('Valid till: ' + this.validDate);
};
