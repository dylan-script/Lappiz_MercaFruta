setTimeout(() => {
    debugger
    var appViewId = getAppViewId();
    console.log(e.dataItem)
    if (appViewId == '8b905cbc-ad73-4f90-99d8-6cb8aaca83bb') {
        if (typeof e.dataItem.EstadoCotizacion === 'undefined') {
            alert('Some')
        } else if (e.dataItem.EstadoCotizacion == 'Aprobado') {
            let current = new Date();
            let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
            let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
            let dateTime = cDate + ' ' + cTime;
            console.log(dateTime);
            var StringQuery = `INSERT INTO MercaFruta_Lappiz_Contrato (Estado, ProductoFK,ProveedorFk, FechaCreacion) VALUES('revision', '${e.dataItem.Id}', '${sessionStorage.ProveedorFk}', '${dateTime}')`;


            execQuery(StringQuery).then(function (response) {
                var dataResult1 = response[0];
                //imprimir resultado de la consulta
                debugger
                console.log(dataResult1);
                toastr.info('Contrato creado')

            });
            var email = 'leijeiwugatte-8478@yopmail.com';
            var subject = 'My life is a bug';
            var text = '';
            var HTML = `<h1>Nuevo Contrato en estado de revisión</h1>`;
            var attachments = [
                {
                    filename: 'test.txt',
                    content: 'Hola mundo Lappiz desde un archivo!'
                }
            ]
            var cc = ["somuguyibru-6731@yopmail.com"]
            var bcc = ["somuguyibru-6731@yopmail.com"]

            sendEmail(email, subject, text, HTML, attachments, cc, bcc).then(function (response) {
                toastr.info('Se ha enviado el correo al gestión de contratos');
            }, function (error) {
                toastr.warning('Ha ocurrido un error al enviar el correo');
            });
        }
    }
}, 100);