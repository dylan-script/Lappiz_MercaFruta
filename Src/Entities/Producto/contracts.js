setTimeout(() => {
    debugger
    var appViewId = getAppViewId();
    console.log(e.dataItem)
    if (e.dataItem.EstadoCotizacion == 'Aprobada') {
        let current = new Date();
        let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
        let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
        let dateTime = cDate + ' ' + cTime;
        console.log(dateTime);
        var StringQuery = `INSERT INTO MercaFruta_Lappiz_Contrato (Estado, OData, ProductoFK,ProveedorFk, FechaCreacion) VALUES('En Elaboración', 'A', '${e.dataItem.Id}', '${e.dataItem.ProveedorFk}', '${dateTime}')`;


        execQuery(StringQuery).then(function (response) {
            var dataResult1 = response[0];
            //imprimir resultado de la consulta
            debugger
            console.log(dataResult1);
            toastr.info('Contrato creado')

        });
        var email = 'leijeiwugatte-8478@yopmail.com';
        var subject = 'Nuevo Contrato En Elaboración';
        var text = '';
        var HTML = `<h1>Nuevo Contrato En Elaboración</h1>`;
        var attachments = [
            {
                filename: 'test.txt',
                content: 'Hola mundo Lappiz desde un archivo!'
            }
        ]
        var cc = ["somuguyibru-6731@yopmail.com"]
        var bcc = [""]

        sendEmail(email, subject, text, HTML, attachments, cc, bcc).then(function (response) {
            toastr.info('Se ha enviado el correo al gestión de contratos');
        }, function (error) {
            toastr.warning('Ha ocurrido un error al enviar el correo');
        });
    }

}, 1000);