setTimeout(() => {
    debugger
    var appViewId = getAppViewId();
    console.log(e.dataItem)
    if (appViewId == '8b905cbc-ad73-4f90-99d8-6cb8aaca83bb') {
        if (typeof e.dataItem.EstadoCotizacion === 'undefined') {
            alert('Error')
        } else if (e.dataItem.EstadoCotizacion == 'Aprobado') {
            var StringQuery = `INSERT INTO MercaFruta_Lappiz_Contrato (Estado, ProductoFK) VALUES('En revision', '${e.dataItem.Id}')`;


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
            var bcc = [""]

            sendEmail(email, subject, text, HTML, attachments, cc, bcc).then(function (response) {
                toastr.info('Se ha enviado el correo a la gestión de contratos');
            }, function (error) {
                toastr.warning('Ha ocurrido un error al enviar el correo');
            });
        }
    }
}, 100);