var square = x => x * x;
console.log(square(9));

user = {
    name:"Davi",
    sayHi: () => {
        console.log(arguments)
        console.log(`hi. I'm ${this.name}`);
    }, //nao funciona, nao "bind this"
    sayHiAlt () {
        console.log(arguments)
        console.log(`hi. I'm ${this.name}`);
    }
};

user.sayHiAlt(1,2,3,5);