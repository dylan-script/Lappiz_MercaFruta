debugger
//Al por mayor
let value = e.value

let cantMayor = '6e91ea3b-3761-4cea-abc1-0e0da8bbf064'
let cantDetal = 'f5aba7d3-f815-4a8a-a8fd-96f62ce61a53'
let pesoMayor = '6fd26d9c-0ec4-4b24-8824-f4162ce80493'
let pesoDetal = '3c90e145-fbd3-48f9-85ac-eb0deb62bd3a'
let precioMayor = '87d2de32-79b1-40d4-aaed-60a5d6022c00'
let precioDetal = '627a3f06-6d66-4980-9192-7afbd4fc3be4'
let cantidadTotal = 'b3f409d1-6f00-4860-b8e7-f957bdb7e820'

var resultMayor = getFieldValue(cantMayor)
var resultDetal = getFieldValue(cantDetal)
let result = value + resultDetal

setFieldValue(cantidadTotal, result)

//Al detal
debugger

/* let value = e.value

let cantMayor = '6e91ea3b-3761-4cea-abc1-0e0da8bbf064'
let cantDetal = 'f5aba7d3-f815-4a8a-a8fd-96f62ce61a53'
let pesoMayor = '6fd26d9c-0ec4-4b24-8824-f4162ce80493'
let pesoDetal = '3c90e145-fbd3-48f9-85ac-eb0deb62bd3a'
let precioMayor = '87d2de32-79b1-40d4-aaed-60a5d6022c00'
let precioDetal = '627a3f06-6d66-4980-9192-7afbd4fc3be4'
let cantidadTotal = 'b3f409d1-6f00-4860-b8e7-f957bdb7e820'

var resultMayor = getFieldValue(cantMayor)
var resultDetal = getFieldValue(cantDetal)
let result = resultMayor + value */

setFieldValue(cantidadTotal, result)
