var TestFunction = function() {
  var Object1 = function() {
    // Object2.call(this);
    this.a = 1;
    this.b = 2;
    this.greeting = function() {
      console.log(this.a, this.b, '==> this.a, this.b..');
      // console.log(this.c, '==> this..');
    };
  };
  var Object2 = function() {
    // Object1.call(this);
    this.c = 3;
    this.feedback = function() {
      console.log(this.c, '==> this.c..');
    };
  };
  const obj1 = new Object1();
  const obj2 = new Object2();
  obj2.greeting = obj1.greeting.bind(obj2);
  obj2.greeting();

  // obj2.greeting();
  // const greeting = Object1.bind(obj2).greeting;
  // greeting();
  // console.log(greeting, '==> greeting..');
  // obj2.feedback();

};

const test = new TestFunction();

const a = {
  name: 'Vu',
  age: 20,
  greeting: function() {
    console.log(this.name, this.age, '==> this.name, this.age..');
  }
}

const b = a.greeting.bind(a);
// b();

// const c = a.greeting.call(a);
// console.log(c, '==> c..');


