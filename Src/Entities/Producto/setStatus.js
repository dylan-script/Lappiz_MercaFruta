setTimeout(() => {
  console.log('Agregando estado...');
  debugger
  if (sessionStorage.rolesId == '12ef9a54-036d-4942-a391-2c9fb6538753') {

    getProveedor();
    var StringQuery = `UPDATE MercaFruta_Lappiz_Productos SET ProveedorFk = '${sessionStorage.ProveedorFk}', EstadoCotizacion = 'revision' WHERE Id='${e.dataItem.Id}'`;
    execQuery(StringQuery).then(function (response) {
      var dataResult = response[0];
      //imprimir resultado de la consulta
      debugger
      console.log(dataResult);
    }, function (error) {
      console.log(error);
    });


    function getProveedor() {
      debugger
      var StringQuery = `SELECT * FROM MercaFruta_Lappiz_Proveedor WHERE UserFK = '${JSON.parse(sessionStorage.LappizUser).Id}'`;
      execQuery(StringQuery).then(function (response) {
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
    }
    var email = 'vebreigrouwaucou-7139@yopmail.com';
    var subject = 'Estado de la Cotización';
    var text = 'Estado de Cotización en revisión';
    var HTML = `<h1>Estado de Cotización en revisión</h1>`;
    var attachments = [
      {
        filename: 'test.txt',
        content: 'Hola mundo Lappiz desde un archivo!'
      }
    ]
    var cc = ["somuguyibru-6731@yopmail.com"]
    var bcc = ["somuguyibru-6731@yopmail.com"]

    sendEmail(email, subject, text, HTML, attachments, cc, bcc).then(function (response) {
      toastr.info(`Estado de cotización: En revisión`);
    }, function (error) {
      toastr.warning('Ha ocurrido un error');
    });
  }else{
    var email = 'vebreigrouwaucou-7139@yopmail.com';
    var subject = 'Estado de la Cotización';
    var text = 'Estado de Cotización en revisión';
    var HTML = `<h1>Estado de Cotización ${e.dataItem.EstadoCotizacion}
    </h1>`;
    var attachments = [
      {
        filename: 'test.txt',
        content: 'Hola mundo Lappiz desde un archivo!'
      }
    ]
    var cc = ["somuguyibru-6731@yopmail.com"]
    var bcc = ["somuguyibru-6731@yopmail.com"]

    sendEmail(email, subject, text, HTML, attachments, cc, bcc).then(function (response) {
      toastr.info(`Estado de cotización:${e.dataItem.EstadoCotizacion}`);
    }, function (error) {
      toastr.warning('Ha ocurrido un error');
    });
  }

}, 1000);
