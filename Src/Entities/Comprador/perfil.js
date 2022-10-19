//AppViewId=53f686d6-7240-4994-b4ea-b6d73ec51ac6
//appViewId=53f686d6-7240-4994-b4ea-b6d73ec51ac6&rowId=bf81093a-1286-49c8-9983-6fab3b0e35f4
setTimeout(() => {
  debugger
  var url = location.href;
  var urlSplit = url.split('appViewId=')
  var idVista = urlSplit[1];
  //Vista Perfil
  if (idVista == '53f686d6-7240-4994-b4ea-b6d73ec51ac6') {
    console.log('Ejecutando Query...')
    var StringQuery = `
    SELECT comp.Nombre, comp.Apellido, us.Phone, us.Email, comp.TipoDocumento, comp.NumeroDocumento, comp.TipoPersona, comp.NombreEmpresa
  FROM MercaFruta_Lappiz_Comprador AS comp
  INNER JOIN MercaFruta_Lappiz_Users AS us
    ON us.Id = comp.UserFk
  WHERE us.Id = '${sessionStorage.userId}'
  `;
    execQuery(StringQuery).then(function (response) {
      var dataResult = response[0];
      console.log(`Nombre: ${dataResult[0].Nombre}`)
      //imprimir resultado de la consulta
      console.log(dataResult);
      setFieldValue('98ad8746-9a5a-4f58-8cc8-ecea7086ced2', dataResult[0].Nombre);
      setFieldValue('89bc54b1-ca50-4e7b-ac9e-d3e0b25c9386', dataResult[0].Apellido);
      setFieldValue('b52155b5-4633-42eb-959e-23e1fca620eb', dataResult[0].Phone);
      setFieldValue('cb73469c-d2b3-4516-ad82-5f6aafb0eeb0', dataResult[0].Email);
      setFieldValue('46226b26-b5f3-4da6-8c77-50851fe91f1d', dataResult[0].TipoDocumento);
      setFieldValue('83fa47ae-63c7-48bd-84a5-3a85437124f2', dataResult[0].NumeroDocumento);
      setFieldValue('bf908a72-c74e-45aa-ad8a-fff09336b79f', dataResult[0].TipoPersona);
      setFieldValue('6e5e8be0-8525-4dc4-8318-be6300f7b454', dataResult[0].NombreEmpresa);
    }, function (error) {
      console.log(error);
    });
  }
}, 1000);