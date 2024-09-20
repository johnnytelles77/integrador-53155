/// Refacturisacion 



const suma = (...nums) => {
    if (nums.length === 0) return 0

    if(!nums.every(num => typeof num === "number")) return null;

    return nums.reduce((acc, num) =>  acc + num, 0);
}

let testPasados = 0;

console.log("Test 1: La funcion suma debe devolver un null si algun parametro no es un numero")

let resultTest1 = suma("30", 3)

if (resultTest1 === null) {
    console.log("Test 1 pasado");
    testPasados++;
} else {
    console.log(`Test 1 fallado, se recibio ${resultTest1}, se esperaba un: null`)
}

console.log("Test 2: La funcion suma debe devolver 0 si no se le pasa ningun parametro")

let resultTest2 = suma();

if (resultTest2 === 0) {
    console.log("Test 2 pasado")
    testPasados++;
} else {
    console.log(`Test 2 fallado, se recibio ${resultTest2}, se esperaba un: 0`)
}

console.log("Test 3: La funcion suma debe poder sumar dos numeros correctamente")

let resultTest3 = suma(10, 5);
if (resultTest3 === 15) {
    console.log("Test 3 pasado")
    testPasados++;
} else {
    console.log(`Test 3 fallado, se recibio ${resultTest3}, se esperaba un: 15`)
}


console.log("Test 4: La funcion debe poder sumar debe poder hacer la suma de varios numeros")

let resultTest4 = suma(10, 5, 2, 5);
if (resultTest4 === 22) {
    console.log("Test 4 pasado")
    testPasados++;
} else {
    console.log(`Test 4 fallado, se recibio ${resultTest3}, se esperaba un: 22`)
}

if (testPasados === 4) {
    console.log("Todos los test pasaron ");
} else {
    console.log("No todos los test pasaron")
}


console.log("Fin de los test")