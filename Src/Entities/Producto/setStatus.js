setTimeout(() => {
  var status = e.dataItem.EstadoCotizacion;
  var email;
  var subject = 'Estado de la Cotización';
  var text = 'Estado de Cotización en revisión';
  var HTML;
  var attachments = [
    {
      filename: 'test.txt',
      content: 'Hola mundo Lappiz desde un archivo!'
    }
  ]
  var cc = [""]
  var bcc = [""]
  var now = new Date().toLocaleString().replace(",", "").replace(/:.. /, " ");
  debugger
  //Proveedor
  if (sessionStorage.rolesId == '12ef9a54-036d-4942-a391-2c9fb6538753') {
    email = JSON.parse(sessionStorage.LappizUser).Email
    cc.push('somuguyibru-6731@yopmail.com')
    if (typeof e.dataItem.EstadoCotizacion === 'undefined') {
      console.log('Agregando estado...');
      getProveedor(0);
      status = 'revision'
      var providerQuery = `UPDATE MercaFruta_Lappiz_Productos SET ProveedorFk = '${sessionStorage.ProveedorFk}', EstadoCotizacion = '${status}', OData = 'A' WHERE Id='${e.dataItem.Id}'`;
      execQuery(providerQuery).then(function (response) {
        var dataResult = response[0];
        //imprimir resultado de la consulta
        debugger
        console.log(dataResult);
      }, function (error) {
        console.log(error);
      });

      var HTML = `<h1>Estado de Cotización en revisión</h1>`;
      var attachments = [
        {
          filename: 'test.txt',
          content: 'Hola mundo Lappiz desde un archivo!'
        }
      ]


    } else if (e.dataItem.EstadoCotizacion == 'Devuelta con Observación') {
      console.log('Pendiente para el estado faltante')
      var ODataQuery = `UPDATE MercaFruta_Lappiz_Productos SET OData = 'F', EstadoCotizacion = 'Recibida con Ajuste' WHERE Id='${e.dataItem.Id}'`;
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
    getProveedor(1)

    email = sessionStorage.ProveedorEmail;
    var HTML = `<h1>Estado de Cotización ${e.dataItem.EstadoCotizacion}
    </h1>`;
    var attachments = [
      {
        filename: 'test.txt',
        content: 'Hola mundo Lappiz desde un archivo!'
      }
    ]
    cc.push(JSON.parse(sessionStorage.LappizUser).Email)


  }


  sendEmail(email, subject, text, HTML, attachments, cc, bcc).then(function (response) {
    toastr.info(`Estado de cotización:${status}`);
  }, function (error) {
    toastr.warning('Ha ocurrido un error');
  });

  function getProveedor(option) {
    debugger
    if (option == 0) {
      var userQuery = `SELECT * FROM MercaFruta_Lappiz_Proveedor WHERE UserFK = '${JSON.parse(sessionStorage.LappizUser).Id}'`;
      execQuery(userQuery).then(function (response) {
        var dataResult = response[0];
        //imprimir resultado de la consulta
        debugger
        console.log(dataResult);
        console.log(`Id Proveedor del dataResult: ${dataResult[0].Id}`);
        sessionStorage.ProveedorFk = dataResult[0].Id;
        console.log(`Id Proveedor en el sessionStorage: ${sessionStorage.ProveedorFk}`);
      }, function (error) {
        console.log(error);
      });
    } else {

      var ODataQuery = `UPDATE MercaFruta_Lappiz_Productos SET OData = '${sessionStorage.OData}', EstadoCotizacion = '${status}', FechaRevision = '${now}' WHERE Id='${e.dataItem.Id}'`;
      execQuery(ODataQuery).then(function (response) {
        var dataResult = response[0];
        //imprimir resultado de la consulta
        debugger
        console.log(dataResult);
      }, function (error) {
        console.log(error);
      });

      var productsQuery = `SELECT ProveedorFk FROM MercaFruta_Lappiz_Productos WHERE Id = '${e.dataItem.Id}'`;


      execQuery(productsQuery).then(function (response) {
        var dataResult1 = response[0];
        //imprimir resultado de la consulta
        debugger
        console.log(dataResult1);
        console.log(`Id Proveedor del dataResult: ${dataResult1[0].ProveedorFk}`);
        sessionStorage.ProveedorFk = dataResult[0].Id;
        console.log(`Id Proveedor en el sessionStorage: ${sessionStorage.ProveedorFk}`);

      });
      var emailQuery = `SELECT Email FROM MercaFruta_Lappiz_Proveedor WHERE Id = '${sessionStorage.ProveedorFk}'`
      execQuery(emailQuery).then(function (response1) {
        debugger
        var dataResult2 = response1[0]
        console.log(dataResult2);
        console.log(`Email Proveedor del dataResult: ${dataResult2[0].Email}`);
        sessionStorage.ProveedorEmail = dataResult2[0].Email;
        console.log(`Email Proveedor en el sessionStorage: ${sessionStorage.ProveedorEmail}`);

      })
    }

  }

}, 3000);
