# Tic Tac Toe Game

[Demo Link](https://jiasong214.github.io/the-odin-project/tic-tac-toe/tic-tac-toe.html)

## What I Learned

### 1. Factory function

Another way to create a object.

```javascript
const Person = (name, age) => {
  const sayHello = () => console.log(`Hello, ${name}!`);
  return { name, age, sayHello };
};

const Jia = Person(Jia, 26);
Jia.sayHello();
```

And I can use prototype in this way here.

```javascript
const Echo = (name) => {
  const sayHello = () => console.log(`Hello, ${name}!`);
  return { sayHello };
};

const Person = (name, age) => {
  const { sayHello } = Echo(name);
  return { name, age, sayHello };
};

const Jia = Person(Jia, 26);
Jia.sayHello();
```

### 2. Closure

```javascript
const FactoryFunction = (name) => {
  const capitalizeName = () => name.toUpperCase();
  const printName = () => console.log(`Hello, ${capitalizeName(name)}!`);
  return { printName };
};

const Jia = FactoryFunction("Jia");
Jia.printName();
```

In this case, function 'capitalizeName' can't be called outside of FactoryFunction because of scope. but if i return a function, i can access to it from the outside of function like function 'printName'. Function 'printName' can access function 'capitalizeName' cause it's in same scope and at the same time, it can be called from outside of 'FactoryFunction'. This is closure.

### 3. Module Pattern

Module is very similar with factory function. Difference is that module wrap a factory function in an IIFE. Becuase Module doesn't need to be created a lot.

### 4. Class

It's a new syntax that uses 'class' keywork, but does same thing with Object Constructor and prototype.

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }
}

let jia = new Person("Jia");
jia.sayHi();
```

When you call 'new Person', constructor function executed automatically.
