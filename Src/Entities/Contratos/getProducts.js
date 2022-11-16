setTimeout(() => {
  debugger
  if (sessionStorage.rolesId == 'd9bbb3d4-3640-4ae2-a980-d2ccfbd13d3c') {
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