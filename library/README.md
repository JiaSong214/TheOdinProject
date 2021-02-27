# Library

[Demo Link](https://jiasong214.github.io/TheOdinProject/library/library.html)

## What I Learned

### 1. Object Constructor

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;

  this.sayHello = function () {
    alert(`Hello, ${this.name}!`);
  };
}

const Jia = new Person(Jia, 26);
Jia.sayHello();
```

By using a object constructor 'new', there is no need to make same object manually.

### 2. Prototype

If i make a new object with 'new', it duplicate everything in it. So If there are 100 of person's object, it will duplicate function 'sayHello' 100 times. To save memories, I can use a prototype, all objects that is made with constructor will inherit a function from prototype.

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHello = function () {
  alert(`Hello, ${this.name}!`);
};

const Jia = new Person(Jia, 26);
Jia.sayHello();
```
