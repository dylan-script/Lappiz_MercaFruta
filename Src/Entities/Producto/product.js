function Product(option) {
  var query = '';
  //
  if (option == 0) {
    debugger
    query = `UPDATE MercaFruta_Lappiz_Productos SET EstadoCotizacion = 'En Revisión', OData = 'B' WHERE Id = '${e.dataItem.Id}'`;
  } else if (option == 1){
    debugger
    query = `SELECT * FROM MercaFruta_Lappiz_Productos WHERE Id = '${e.dataItem.Id}'`
  }
  execQuery(query).then(function (response) {
    var dataResult = response[0];
    //imprimir resultado de la consulta
    sessionStorage.DB = JSON.stringify(dataResult[0]);
    console.log(sessionStorage.DB);
  }, function (error) {
    console.log(error);
  });
}