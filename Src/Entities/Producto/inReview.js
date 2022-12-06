function getData() {
  setTimeout(() => {
    debugger
    console.log(e.dataItem)
    var status = 'En Revisión';
    var updateQuery = `UPDATE FrutaNet_Lappiz_Productos SET EstadoCotizacion = '${status}', OData = 'B' WHERE Id = '${e.dataItem.Id}'`;
    execQuery(updateQuery).then(function (response) {
      debugger
      var dataResult = response[0];
      //imprimir resultado de la consulta
      toastr.info(`Cotización Actualizada. Estado: En Revisión`);
      console.log(dataResult);
    }, function (error) {
      console.log(error);
      toastr.warning('Ha ocurrido un inconveniente. Comunicar con el equipo de soporte.');
    });

    var selectQuery = `SELECT ProveedorFk, Nombre FROM FrutaNet_Lappiz_Productos WHERE Id = '${e.dataItem.Id}'`;
    execQuery(selectQuery).then(function (response) {
      debugger
      var dataResult = response[0];
      sessionStorage.IdProvider = dataResult[0].ProveedorFk
      console.log(sessionStorage.IdProvider);
      sessionStorage.ProductName = dataResult[0].Nombre
      console.log(sessionStorage.ProductName);
      //imprimir resultado de la consulta
      console.log(dataResult);
    }, function (error) {
      console.log(error);
      toastr.warning('Ha ocurrido un inconveniente. Comunicar con el equipo de soporte.');
    });

    var selectProv = `SELECT Nombre, Apellido, Email FROM FrutaNet_Lappiz_Proveedor WHERE Id = '${sessionStorage.IdProvider}'`;
    execQuery(selectProv).then(function (response) {
      debugger
      var dataResult = response[0];
      sessionStorage.FullName = `${dataResult[0].Nombre} ${dataResult[0].Apellido}`
      console.log(sessionStorage.FullName);
      sessionStorage.Email = dataResult[0].Email;
      console.log(sessionStorage.Email);
      //imprimir resultado de la consulta
      console.log(dataResult);
    }, function (error) {
      console.log(error);
      toastr.warning('Ha ocurrido un inconveniente. Comunicar con el equipo de soporte.');
    });


    //location.reload();
    var urlList = '#/grids?viewName=FrutaNet_Lappiz_Productos&workspaceId=e5b03115-2a14-4956-833a-10796e1dd2d4&entityId=3236f5d9-3fc5-4cdf-86c3-e1d2b3815b66&dato=Recibidas&appViewId=0d952afb-2a18-4de3-aa61-66f0cd801a15';
    goLocation(urlList);

    debugger
    sendMessage(sessionStorage.Email, `Producto ${sessionStorage.ProductName} en revisión`, ['somuguyibru-6731@yopmail.com'], [""], sessionStorage.ProductName, 'Se le notificará nuevamente al correo electrónico la decisión tomada con su producto', status, sessionStorage.FullName);
  }, 1000);
}

function sendMessage(email, subject, cc, bcc, productName, comments, status, providerName) {
  setTimeout(() => {

    debugger
    var text = '';
    var HTML = `<!-- Complete Email template -->

  <body>
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="550" bgcolor="white"
      style="border:2px solid black">
      <tbody>
        <tr>
          <td align="center">
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="col-550" width="550">
              <tbody>
                <tr>
                  <td align="center" style="background-color: #f0932b;
                      height: 50px;">
  
                    <a href="#" style="text-decoration: none;">
                      <p style="color:white;
                          font-weight:bold; font-size: 2rem;">
                        Frutanet
                      </p>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr style="height: 300px;">
          <td align="center" style="border: none;
              border-bottom: 2px solid #4cb96b;
              padding-right: 20px;padding-left:20px">
  
            <p style="font-weight: bolder;font-size: 42px;
                letter-spacing: 0.025em;
                color:black;">
              Notificación de la cotización
            </p>
          </td>
        </tr>
  
        <tr style="display: inline-block;">
          <td style="height: 150px;
              padding: 20px;
              border: none;
              border-bottom: 2px solid #361B0E;
              background-color: white;">
  
            <h2 style="text-align: left;
                align-items: center;">
                Señor(a) ${providerName},
                la cotización de su producto ${productName} 
                se encuentra: ${status}
            </h2>
            <p class="data" style="text-align: justify-all;
                align-items: center;
                font-size: 15px;
                padding-bottom: 12px;">
              Observaciones:
              ${comments}. 
            </p>
            <p>
              <a href="https://runtimetest.lappiz.io/#/auth/login/FrutaNet_Lappiz"
                style="text-decoration: none;
                  color:black;
                  border: 2px solid #4cb96b;
                  padding: 10px 30px;
                  font-weight: bold;">
                Ir a Frutanet
              </a>
            </p>
          </td>
        </tr>
        <tr style="border: none;
        background-color: #f0932b;
        height: 40px;
        color:white;
        padding-bottom: 20px;
        text-align: center;">
  
          <td height="40px" align="center">
            <p style="color:white;
    line-height: 1.5em;
    font-size: 1em;">
              Frutanet
            </p>
            <a href="#" style="border:none;
      text-decoration: none;
      padding: 5px;">
  
              <img height="30"
                src="https://extraaedgeresources.blob.core.windows.net/demo/salesdemo/EmailAttachments/icon-twitter_20190610074030.png"
                width="30" />
            </a>
  
            <a href="#" style="border:none;
    text-decoration: none;
    padding: 5px;">
  
              <img height="30"
                src="https://extraaedgeresources.blob.core.windows.net/demo/salesdemo/EmailAttachments/icon-linkedin_20190610074015.png"
                width="30" />
            </a>
  
            <a href="#" style="border:none;
    text-decoration: none;
    padding: 5px;">
  
              <img height="20"
                src="https://extraaedgeresources.blob.core.windows.net/demo/salesdemo/EmailAttachments/facebook-letter-logo_20190610100050.png"
                width="24" style="position: relative;
        padding-bottom: 5px;" />
            </a>
          </td>
        </tr>
        <tr>
          <td style="font-family:'Open Sans', Arial, sans-serif;
      font-size:11px; line-height:18px;
      color:#999999;" valign="top" align="center">
            <a href="#" target="_blank" style="color:#999999;
      text-decoration:underline;">DECLARACIÓN DE CONFIDENCIALIDAD</a>
            | <a href="#" target="_blank" style="color:#999999; text-decoration:underline;">TÉRMINOS DEL SERVICIO</a>
            | <a href="#" target="_blank" style="color:#999999; text-decoration:underline;">DEVOLUCIÓN</a><br>
            © 2022 Frutanet. Todos los derechos reservados.<br>
          </td>
        </tr>
      </tbody>
    </table>
    </td>
    </tr>
    <tr>
      <td class="em_hide" style="line-height:1px;
          min-width:700px;
          background-color:#ffffff;">
        <img alt="" src="images/spacer.gif" style="max-height:1px;
        min-height:1px;
        display:block;
        width:700px;
        min-width:700px;" width="700" border="0" height="1">
      </td>
    </tr>
    </tbody>
    </table>
  </body>`;
    var attachments = [
      {
        filename: 'test.txt',
        content: 'Hola mundo Lappiz desde un archivo!'
      }
    ]

    sendEmail(email, subject, text, HTML, attachments, cc, bcc).then(function (response) {
      toastr.info(`Se ha notificado al proveedor ${providerName} en su correo ${email}`);
    }, function (error) {
      toastr.warning('Ha ocurrido un error al enviar el correo');
    });
  }, 3000);
}