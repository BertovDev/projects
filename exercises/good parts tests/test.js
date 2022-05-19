// const stooge = {
//     first_name: "Jerome",
//     last_name: "Howard",
//     nickname: "Curly"
// };



// const aux = stooge;
// aux.nickname = "Nick";



// console.log(stooge);
// delete aux.nickname;
// console.log(stooge);

// console.log(aux);

const MYAPP = {};

MYAPP.stooge = {
    first_name: "Jerome",
    last_name: "Howard",
    nickname: "Curly"
}

MYAPP.flight = {
    airline : "Oceanic",
    number: 815,
    departure: {
        IATA:"SYD",
        city:"Sydney"
    }
}

console.log(MYAPP);