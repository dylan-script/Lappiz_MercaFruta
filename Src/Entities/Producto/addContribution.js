setTimeout(() => {
    console.log('Agregando estado pendiente...');
    debugger
    getProveedor();
    var StringQuery = `UPDATE MercaFruta_Lappiz_Productos SET ProveedorFk = '${sessionStorage.ProveedorFk}', EstadoCotizacion = 'Pendiente' WHERE Id='${e.dataItem.Id}'`;
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
}, 1000);
