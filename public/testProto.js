const animal = {
    status: null,
    init(living) {
        this.living = living;
    },
    get getStatus() {
        return this.living;
    },

    dead() {
        this.living = false;
    }
};

const dog = {
    __proto__: animal,
}

const zombieDog = {
    __proto__: dog,
    alive() {
        this.living = true;
    }
}

let billy = {
    __proto__: dog
};
billy.init(true);

let frank = {
    __proto__: zombieDog
};
frank.init(false);

console.log("Billy", billy.getStatus);
billy.dead();
console.log("Billy", billy.getStatus);

console.log("Frank", frank.getStatus);
frank.alive();
console.log("Frank", frank.getStatus);
frank.dead();
console.log("Frank", frank.getStatus);