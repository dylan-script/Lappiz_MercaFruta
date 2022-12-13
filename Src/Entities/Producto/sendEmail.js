function sendMessage(email, subject, cc, bcc, productName, comments, status, providerName) {
  setTimeout(() => {

    debugger
    let status_image = getStatusImg(status)
    let total = parseFloat(e.dataItem.PesoDetalValor) + parseFloat(e.dataItem.PesoMayorValor)
    let query_img = `SELECT Foto FROM FrutaNet_Lappiz_Productos WHERE Id = '${e.dataItem.Id}'`
    let prodImg = execQuery(query_img).then(function (response) {
      var dataResult = response[0];
      //imprimir resultado de la consulta
      console.log(dataResult);
      var img = dataResult[0].Foto
      sessionStorage.product = dataResult[0].Foto;
      console.log(sessionStorage.product)
      return img;
    }, function (error) {
      console.log(error);
      return error;
    });
    var text = '';
    var HTML = `<!-- Complete Email template -->

  <body style="background-color:rgb(236, 232, 232)">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="850" bgcolor="white">
      <tbody>
        <tr>
          <td align="center">
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="col-850" width="850">
              <tbody>
                <tr>
                  <td align="center" style="background-color: #f57c0a;
                      height: 100px;">
  
                    <a href="#" style="text-decoration: none;">
                      <p style="color:white;
                          font-weight:bold;
                          font-family: sans-serif;
                          font-size: 32px;
                          float: left;
                          margin-left: 40px;">
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
              border-bottom: 2px solid #f57c0a;
              padding-right: 20px;padding-left:20px">
              ${status_image}
            <p style="font-weight: bolder;font-size: 24px;font-family: sans-serif;
                letter-spacing: 0.025em;
                color:rgb(56, 55, 55);
                margin-bottom: 50px;">
              Actualización de estado!
              <br> Revisa el progreso de tu cotización
            </p>
          </td>
        </tr>
        <tr>
          <td>
  
          </td>
        </tr>
  
        <tr style="display: inline-block;">
          <td style="height: 150px;
              padding: 20px;
              border: none;
              border-bottom: 2px solid #e0550f;
              background-color: white;">
  
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="800">
              <tr>
                <td colspan="3" style=" height: 20px; border-bottom-left-radius: 16px;  display: flex; justify-content: center;
                  background-color: #ffffff">
                  <div style="width: 200px; height: 200px;">
                    <img src="${e.dataItem.Foto}" alt="Foto del Producto"
                      style="width:100%; border-radius: 16px;">
                  </div>
                </td>
                <td style=" height: 20px; 
                    width: 80%;">
                  <h4 style="margin: 15px; font-family: sans-serif; color: #f57c0a">${e.dataItem.Tipo}
                  </h4>
                  <h2
                    style="margin-top: 10px; margin-left: 15px; margin-bottom: 0; font-family: sans-serif; color: rgb(56, 55, 55)">
                    ${e.dataItem.Nombre}
                  </h2>
                  <h4
                    style=" margin-left: 15px; margin-top: 0; font-family: sans-serif; color: rgb(58, 58, 58);">
                    Código: ${e.dataItem.NumeroCotizacion}</h4>
  
  
                  <p style="margin-left: 15px;
                    padding: 8px;
                    padding-bottom: 2px;
                    font-family: sans-serif;
                    color:#ffffff;
                    background-color: rgb(29, 153, 255);
                    width: max-content;
                    height: 25px;
                    text-align: center;
                    border-radius: 16px;">
                    <strong>Estado de cotización: </strong>
                    ${status}
                  </p>
                  <h4
                    style=" margin-left: 15px; margin-top: 0; font-family: sans-serif; color: rgb(58, 58, 58);">
                    Detalles del producto</h4>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-left: 15px; padding-right: 15px; text-align: center;">
										<tr>
											<th colspan="5" style="border-top-left-radius: 16px; border-top-right-radius: 16px; font-family: sans-serif; border:1px solid #e0550f; background-color:#e0550f; color:#ffffff; padding: 10px;">Precio ofertado</th>
										</tr>
										<tr>
											<td style="font-family: sans-serif; border:1px solid #e0550f;"> Al por mayor</td>
											<td style="font-family: sans-serif; border:1px solid #e0550f;"><strong>Precio Unitario</strong> $${e.dataItem.PrecioMayor}</td>
											<td style="font-family: sans-serif; border:1px solid #e0550f;"><strong>Cantidad</strong> ${e.dataItem.CantidadMayor}</td>
											<td style="font-family: sans-serif; border:1px solid #e0550f;"><strong>Peso</strong> ${e.dataItem.PesoAlPorMayor} ${e.dataItem.PesoMayor}</td>
											<td style="font-family: sans-serif; border:1px solid #e0550f;"><strong>Subtotal</strong> $${e.dataItem.PesoMayorValor}</td>
										</tr>
										<tr>
											<td style="font-family: sans-serif; border:1px solid #e0550f; border-bottom-left-radius:16px; "> Al detal</td>
											<td style="font-family: sans-serif; border:1px solid #e0550f;"><strong>Precio Unitario</strong> $${e.dataItem.Precio}</td>
											<td style="font-family: sans-serif; border:1px solid #e0550f;"><strong>Cantidad</strong> ${e.dataItem.CantidadDetal}</td>
											<td style="font-family: sans-serif; border:1px solid #e0550f; "><strong>Peso</strong> ${e.dataItem.PesoAlDetal} ${e.dataItem.PesoDetal}</td>
											<td style="font-family: sans-serif; border:1px solid #e0550f; "><strong>Subtotal</strong> $${e.dataItem.PesoDetalValor}</td>
										</tr>
										<tr>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
											<td style="font-family: sans-serif; border:1px solid #e0550f; border-bottom-left-radius:16px; border-bottom-right-radius:16px;"><strong>Total</strong>
												$${total}
											</td>
										</tr>
									</table>
                  <p style="margin-left: 15px; font-family: sans-serif; color: rgb(58, 58, 58);">
                    Cantidad:</p>
                  <p style="margin-left: 15px;font-family: sans-serif; color: rgb(58, 58, 58);">Fecha: ${e.dataItem.Disponibilidad}
                  </p>
                  <p style="margin-left: 15px;font-family: sans-serif; color: rgb(58, 58, 58);">
                    Ubicación:</p>
                  <p style="margin-left: 15px;font-family: sans-serif; color: rgb(58, 58, 58);">
                    <strong>Descripción: </strong>
                    ${e.dataItem.Descripcion}
                  </p>
                  <p
                    style="font-family: sans-serif; color: rgb(58, 58, 58); float: right; margin-right: 10px;">
                    <a href="">Mostrar más+</a>
                  </p>
                </td>
              </tr>
  
  
  
  
            </table>
            <h4 style="font-family: sans-serif; color: rgb(58, 58, 58); margin-left: 5px;">Observaciones</h4>
            <div style="background-color:#f3d2ab; padding: 15px; border-radius: 16px;">
              <p class="data" style="text-align: justify-all;
              align-items: center;
              font-size: 15px;
              font-family: sans-serif;
              padding-bottom: 12px;
              color: rgb(58, 58, 58);">
              ${comments}.
              </p>
            </div>
            <p style="text-align: center; margin: 40px;">
              <a href="https://runtimetest.lappiz.io/#/auth/login/FrutaNet_Lappiz" style="text-decoration: none;
                  border: 2px solid #f57c0a;
                  color: #f57c0a;
                  border-radius: 24px;
                  padding: 10px 30px;
                  font-weight: bold;
                  text-align: center;
                  font-family: sans-serif;">
                Ir a Frutanet
              </a>
            </p>
          </td>
        </tr>
        <tr style="border: none;
        background-color: #f57c0a;
        height: 40px;
        color:white;
        padding-bottom: 20px;
        text-align: center;">
  
          <td height="40px" align="center">
            <p style="color:white;
    line-height: 1.5em;
    font-family: sans-serif;
    margin-top: 20px;">
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
      text-decoration:underline;">PRIVACY STATEMENT</a>
            | <a href="#" target="_blank" style="color:#999999; text-decoration:underline;">TERMS OF SERVICE</a>
            | <a href="#" target="_blank" style="color:#999999; text-decoration:underline;">RETURNS</a><br>
            © 2022 Frutanet. All Rights Reserved.<br>
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

//Devuelta con Observación,Aprobada,No Aprobada
function getStatusImg(status) {
  debugger
  let statusImg = 0
  if (status == 'En Revisión') {
    statusImg = '<a href="https://postimg.cc/GHj1LtrP" target="_blank"><img src="https://i.postimg.cc/GHj1LtrP/Estado-En-Revision.jpg" alt="Estado-En-Revision"/></a>'
  }

  if (status == 'Devuelta con Observación') {
    statusImg = `<a href="https://postimg.cc/wRdSH8Gb" target="_blank"><img src="https://i.postimg.cc/wRdSH8Gb/Estado-Devuelto-con-Observaciones.png" alt="Estado-Devuelto-con-Observaciones"/></a>`
  }

  if (status == 'Aprobada') {
    statusImg = `<a href="https://postimg.cc/4KYCQ1cw" target="_blank"><img src="https://i.postimg.cc/4KYCQ1cw/Estado-Aprobado.png" alt="Estado-Aprobado"/></a>`
  }

  if (status == 'No Aprobada') {
    statusImg = `<a href="https://postimg.cc/qNbVKFNz" target="_blank"><img src="https://i.postimg.cc/qNbVKFNz/Estado-No-Aprobado.png" alt="Estado-No-Aprobado"/></a>`
  }

  if (status == 'Recibida con Ajuste') {
    statusImg = `<a href="https://postimg.cc/7CdFsTM4" target="_blank"><img src="https://i.postimg.cc/7CdFsTM4/Estado-Recibido-con-ajustes.png" alt="Estado-Recibido-con-ajustes"/></a>`
  }

  if (status == 'Recibida') { statusImg = `<a href="https://postimg.cc/xqKw58kr" target="_blank"><img src="https://i.postimg.cc/xqKw58kr/Estado-Recibido.png" alt="Estado-Recibido"/></a>` }
  debugger
  return statusImg;

}