function getData(dataResult){
  let arrIds =['98ad8746-9a5a-4f58-8cc8-ecea7086ced2',
'89bc54b1-ca50-4e7b-ac9e-d3e0b25c9386'];
for(let i =0; i < arrIds.length; i++){
  setFieldValue(arrIds[i], dataResult[i])
}
}