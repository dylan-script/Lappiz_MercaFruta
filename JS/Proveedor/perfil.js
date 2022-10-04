//AppViewId=53f686d6-7240-4994-b4ea-b6d73ec51ac6
//appViewId=53f686d6-7240-4994-b4ea-b6d73ec51ac6&rowId=bf81093a-1286-49c8-9983-6fab3b0e35f4
setTimeout(() => {
  debugger
  var url = location.href;
  var urlSplit = url.split('appViewId=')
  var idVista = urlSplit[1];
  //Vista Perfil
  if (idVista == '224a19a4-5924-4d46-8915-80d032ce3a4d') {
    console.log('Ejecutando Query...')
    var StringQuery = `
    SELECT comp.Nombre, comp.CEDescripcin, us.Phone, us.Email, comp.TipoDocumento, comp.NumeroDocumento, comp.TipoPersona, comp.NombreEmpresa
  FROM MercaFruta_Lappiz_Proveedor AS comp
  INNER JOIN MercaFruta_Lappiz_Users AS us
    ON us.Id = comp.UserFk
  WHERE us.Id = '${sessionStorage.userId}'
  `;
    execQuery(StringQuery).then(function (response) {
      var dataResult = response[0];
      console.log(`Nombre: ${dataResult[0].Nombre}`)
      //imprimir resultado de la consulta
      console.log(dataResult);
      setFieldValue('41abe8ad-e66e-4fba-9041-77681f9b56b5', dataResult[0].CEDescripcin);
      setFieldValue('89bc54b1-ca50-4e7b-ac9e-d3e0b25c9386', dataResult[0].Nombre);
      setFieldValue('a21a8b8e-e3ec-4536-a669-9ef334a2822e', dataResult[0].Departamento);
      setFieldValue('fab17c20-1eb1-4143-aeac-eb85dcf297bd', dataResult[0].Ciudad);
      setFieldValue('4dac4cc7-2ad8-4e83-8321-f0a6bebdc67d', dataResult[0].Direccion);
      setFieldValue('83fa47ae-63c7-48bd-84a5-3a85437124f2', dataResult[0].NumeroDocumento);
      setFieldValue('1471cbb8-f2a6-48be-8abb-22cbd011d70d', dataResult[0].TipoPersona);
      setFieldValue('6e5e8be0-8525-4dc4-8318-be6300f7b454', dataResult[0].Pais);
      setFieldValue('6e5e8be0-8525-4dc4-8318-be6300f7b454', dataResult[0].Telefono);
      setFieldValue('3727c701-d599-48bb-b46b-d0002ac51b80', dataResult[0].Email);
      
    }, function (error) {
      console.log(error);
    });
  }
}, 1000);