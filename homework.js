// // -------------------------- Home work --------------------------
// // -------------------------- ФИО --------------------------
// Замыкания. Задачи.
// 1. Есть класс Planet
/**
 * @description function constructor whith property planet name and method whith return planet name
 * @param {string} name - planet nema 
 */
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
/**
 * @description function constructor will inherit constructor of PLanet and change its method whith return planet and sattelite name
 * @param {string} name - planet name 
 * @param {string} satelliteName - planet satellite name
 */ 

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

/**
 * @description function constructor whith two properties name ond floors and two methods
 * get floors and set floors
 * @param {string} name - building name 
 * @param {number} floors - number of floors 
 */
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
/**
 * @description function constructor will inherit constructor of Building
 * and add new method to count appartment
 * @param {string} name - building name 
 * @param {number} floors - number of floors  
 * @param {number} apartments - number of apartments 
 */
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
/**
 * @description function constructor will inherit constructor of Building
 * and add new method to count shops
 * @param {string} name - building name 
 * @param {number} floors - number of floors  
 * @param {number} shops - number of shops 
 */
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

/**
 * @description function constructor whith two properties name and price
 * @param {string} name - name of Furniture
 * @param {number} price - price of Furniture 
 */
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
/**
 * @description function constructor whith propertie name of user
 * @param {string} name - name of Furniture
 */
let User = function(name) {
    this.name = name;
    this.dateOfRegistration = new Date(Date.now());
}

User.prototype.getInfo = function() {
    console.log(this.name, this.dateOfRegistration);
}

let user = new User('Ivan');
/**
 * @description function constructor will iherit User constructor
 * @param {string} name - admin name 
 * @param {boolean} sup - boolean value admin status
 */
let Admin = function(name, sup) {
    User.call(this, name);
    superAdmin = sup;
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;


let admin = new Admin('Ivan', true);

Admin.prototype.getInfo = function() {
    User.prototype.getInfo.call(this);
    console.log('Super admin: ' + superAdmin);
}.bind(admin);

/**
 * @description function constructor will iherit User constructor
 * @param {string} name - admin name 
 */

let Guest = function(name) {
    User.call(this, name);
    this.validDate = this.dateOfRegistration + 604800000;
}
Guest.prototype = Object.create(Guest.prototype);
Guest.prototype.constructor = Guest;

let guest = new Guest('Kolya');

Guest.prototype.getInfo = function() {
    User.prototype.getInfo.call(this);
    console.log('Valid till: ' + new Date(this.validDate));
};
