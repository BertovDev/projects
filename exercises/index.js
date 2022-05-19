//exercise 1
const checkNumbers = (x,y) => {
    if(x === 100 || y === 100 || x+y === 100){
        return true;
    }
    return false;
}
//exercise 2
const getExtension = (str) => {
    if(!str.includes(".")){
        console.log("This is not a file.. or similar")
        return false;
    }
    const aux = str.slice(str.lastIndexOf(".")+1);
    console.log(`The extension file is : ${aux}`);
}
//exercise 3
const nextCharacter = (str) => {
    const alpha = "abcdefghijklmnopqrstuvwxyz";
    let aux = "";
    let newStr = "";
    for(let i of str){
        if(i === "z"){
            newStr = newStr + "a";
        } else {
            aux = alpha.indexOf(i);
            newStr = newStr + alpha[aux+1];
        }  
    }
    console.log(newStr);
}
const characterOtherAproach = (str) => {
    str
    .split()
    .map(char => String.fromCharCode(char.charCodeAt(0)+1))
    .join("");

}
//exercise 4
const showDate = () => {
    const auxDate =  new Date();
    const year = auxDate.getFullYear();
    const month = auxDate.getMonth()+1;
    const day = auxDate.getDate();
    
    console.log(`${month}-${day}-${year}`);
}
//exercise 5
const addNewToString = (str) => str.includes("New!") === true ? str : `New! ${str}`;
//exercise 6

//exercise 7
//exercise 8
//exercise 9
//exercise 10





