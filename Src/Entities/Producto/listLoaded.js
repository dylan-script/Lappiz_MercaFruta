setTimeout(() => {
  debugger
  getProv(sessionStorage.rolesId);
}, 1000);

function getProv(rolId) {
  var query = '';
  //Proveedor
  if (rolId == '12ef9a54-036d-4942-a391-2c9fb6538753') {
    debugger
    query = `SELECT * FROM MercaFruta_Lappiz_Proveedor WHERE UserFK = '${JSON.parse(sessionStorage.LappizUser).Id}'`;
    execQuery(query).then(function (response) {
      var dataResult = response[0];
      //imprimir resultado de la consulta
      sessionStorage.Proveedor = dataResult[0].Id;
      console.log(sessionStorage.Proveedor);
      sessionStorage.DB = JSON.stringify(dataResult[0]);
      console.log(sessionStorage.DB);
      console.log(sessionStorage.ProveedorFk);
    }, function (error) {
      console.log(error);
    });
  }else{
      sessionStorage.Proveedor = 'Not yet';
      console.log(sessionStorage.Proveedor);
  }
}
