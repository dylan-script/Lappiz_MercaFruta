//AppViewId=53f686d6-7240-4994-b4ea-b6d73ec51ac6
//appViewId=53f686d6-7240-4994-b4ea-b6d73ec51ac6&rowId=bf81093a-1286-49c8-9983-6fab3b0e35f4
setTimeout(() => {
  var url = location.href;
  var urlSplit = url.split('appViewId=')
  var idVista = urlSplit[1];
  //Vista Perfil
  if (idVista == '53f686d6-7240-4994-b4ea-b6d73ec51ac6') {
    console.log('Ejecutando Query...')
    var StringQuery = `
    SELECT comp.Nombre, comp.Apellido, us.FullName
  FROM MercaFruta_Lappiz_Comprador AS comp
  INNER JOIN MercaFruta_Lappiz_Users AS us
    ON us.Id = comp.UserFk
  WHERE us.Id = '${sessionStorage.userId}'
  `;
    execQuery(StringQuery).then(function (response) {
      var dataResult = response[0];
      console.log(`Nombre: ${response[0].Nombre}`)
      console.log(`Nombre: ${dataResult[0].Nombre}`)
      //imprimir resultado de la consulta
      console.log(dataResult);
    }, function (error) {
      console.log(error);
    });
  }
}, 1000);