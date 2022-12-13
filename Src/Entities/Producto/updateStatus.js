setTimeout(() => {
  var status = e.dataItem.EstadoCotizacion;
  var email;
  var subject = '';
  var comments = ''
  var cc = [""]
  var bcc = [""]
  var now = new Date().toLocaleString().replace(",", "").replace(/:.. /, " ");
  debugger
  //Proveedor
  if (sessionStorage.rolesId == '12ef9a54-036d-4942-a391-2c9fb6538753') {
    email = JSON.parse(sessionStorage.LappizUser).Email
    cc.push('somuguyibru-6731@yopmail.com')
    getProveedor(0);
    if (typeof e.dataItem.EstadoCotizacion === 'undefined') {
      console.log('Agregando estado...');
      status = 'Recibida'
      subject = `Producto ${e.dataItem.Nombre} recibido`
      comments = `Hemos recibido su producto ${e.dataItem.Nombre}. Le notificaremos por este mismo medio el momento en que iniciemos el proceso de revisión. Queda tenga un buen día`
      var providerQuery = `UPDATE FrutaNet_Lappiz_Productos SET ProveedorFk = '${sessionStorage.ProveedorFk}', EstadoCotizacion = '${status}', OData = 'A' WHERE Id='${e.dataItem.Id}'`;
      debugger
      execQuery(providerQuery).then(function (response) {
        var dataResult = response[0];
        //imprimir resultado de la consulta
        debugger
        console.log(dataResult);
      }, function (error) {
        console.log(error);
      });

    } else if (e.dataItem.EstadoCotizacion == 'Devuelta con Observación') {
      //console.log('Pendiente para el estado faltante')
      status = 'Recibida con Ajuste'
      subject = `Producto ${e.dataItem.Nombre} recibido con ajuste`
      comments = `Hemos recibido su producto ${e.dataItem.Nombre} con los respectivos ajustes solicitados. Le notificaremos en los próximos días si se aprueba o no su cotización. Queda tenga un buen día`
      var ODataQuery = `UPDATE FrutaNet_Lappiz_Productos SET OData = 'F', EstadoCotizacion = '${status}' WHERE Id='${e.dataItem.Id}'`;
      execQuery(ODataQuery).then(function (response) {
        var dataResult = response[0];
        //imprimir resultado de la consulta
        debugger
        console.log(dataResult);
      }, function (error) {
        console.log(error);
      });
    }
  } else {
    //Administrador de Cotizaciones
    debugger
    status = e.dataItem.EstadoCotizacion;
    getProveedor(1)
    let productStatus;
    email = sessionStorage.ProveedorEmail;
    switch (e.dataItem.EstadoCotizacion) {
      case 'Aprobada':
        productStatus = 'Aprobado'
        break;

      case 'No Aprobada':
        productStatus = 'No Aprobado'
        break;

      default: productStatus = 'Devuelto con Observación'
        break;
    }

    subject = `Producto ${e.dataItem.Nombre} ${productStatus}`
    comments = e.dataItem.ObservacionesCotizacion
    cc.push(JSON.parse(sessionStorage.LappizUser).Email)


  }
  //Envío al correo
  sendMessage(email, subject, cc, bcc, e.dataItem.Nombre, comments, status, sessionStorage.FullName);

  function getProveedor(option) {
    debugger
    if (option == 0) {
      var userQuery = `SELECT * FROM FrutaNet_Lappiz_Proveedor WHERE UserFK = '${JSON.parse(sessionStorage.LappizUser).Id}'`;
      execQuery(userQuery).then(function (response) {
        var dataResult = response[0];
        //imprimir resultado de la consulta
        debugger
        console.log(dataResult);
        console.log(`Id Proveedor del dataResult: ${dataResult[0].Id}`);
        sessionStorage.ProveedorFk = dataResult[0].Id;
        console.log(`Id Proveedor en el sessionStorage: ${sessionStorage.ProveedorFk}`);
        sessionStorage.FullName = `${dataResult[0].Nombre} ${dataResult[0].Apellido}`
        console.log(sessionStorage.FullName);
      }, function (error) {
        console.log(error);
      });
    } else {

      var ODataQuery = `UPDATE FrutaNet_Lappiz_Productos SET OData = '${sessionStorage.OData}', EstadoCotizacion = '${status}', FechaRevision = '${now}' WHERE Id='${e.dataItem.Id}'`;
      execQuery(ODataQuery).then(function (response) {
        var dataResult = response[0];
        //imprimir resultado de la consulta
        debugger
        console.log(dataResult);
      }, function (error) {
        console.log(error);
      });

      var productsQuery = `SELECT ProveedorFk FROM FrutaNet_Lappiz_Productos WHERE Id = '${e.dataItem.Id}'`;

      execQuery(productsQuery).then(function (response) {
        var dataResult1 = response[0];
        //imprimir resultado de la consulta
        debugger
        console.log(dataResult1);
        console.log(`Id Proveedor del dataResult: ${dataResult1[0].ProveedorFk}`);
        sessionStorage.ProveedorFk = dataResult[0].Id;
        console.log(`Id Proveedor en el sessionStorage: ${sessionStorage.ProveedorFk}`);
      }, function (error) {
        console.log(error);
      });

      var emailQuery = `SELECT * FROM FrutaNet_Lappiz_Proveedor WHERE Id = '${sessionStorage.ProveedorFk}'`
      execQuery(emailQuery).then(function (response1) {
        var dataResult2 = response[0];
        //imprimir resultado de la consulta
        debugger
        console.log(dataResult2);
        sessionStorage.FullName = `${dataResult2[0].Nombre} ${dataResult2[0].Apellido}`
        console.log(sessionStorage.FullName);
        sessionStorage.ProveedorEmail = dataResult2[0].Email
        console.log(sessionStorage.ProveedorEmail);
      }, function (error) {
        console.log(error);
      });
    }

  }

}, 3000);
