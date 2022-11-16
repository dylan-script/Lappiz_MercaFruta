setTimeout(() => {
  debugger
  if (sessionStorage.rolesId == '12ef9a54-036d-4942-a391-2c9fb6538753') {
    var StringQuery = `SELECT Id FROM MercaFruta_Lappiz_Proveedor WHERE UserFK = '${JSON.parse(sessionStorage.LappizUser).Id}'`;
    execQuery(StringQuery).then(function (response) {
      var dataResult = response[0];
      //imprimir resultado de la consulta
      sessionStorage.ProveedorFk = dataResult[0].Id;
      console.log(dataResult);
      console.log(sessionStorage.ProveedorFk);
    }, function (error) {
      console.log(error);
    });
  }
}, 3000);