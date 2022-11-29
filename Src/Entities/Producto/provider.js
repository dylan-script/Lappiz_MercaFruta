function Provider(option) {
  var query = '';
  //Proveedor
  if (option == 0) {
    debugger
    query = `SELECT * FROM MercaFruta_Lappiz_Proveedor WHERE Id = '${sessionStorage.ProveedorFk}'`
  } else if (option == 1) {
    debugger
    query = `SELECT * FROM MercaFruta_Lappiz_Proveedor WHERE Id = '${sessionStorage.ProveedorFk}'`
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