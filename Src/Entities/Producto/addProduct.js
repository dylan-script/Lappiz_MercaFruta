setTimeout(() => {
    debugger
    function getToken() {
        return new Promise((resolve, reject) => {
            var settings = {
                "url": "https://designertest.lappiz.io/Api/token",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                "data": {
                    "grant_type": "password",
                    "username": "admin@mercafruta.com",
                    "password": "Fruta.2022"
                }
            };

            $.ajax(settings).done(function (response) {
                resolve(response);
            }).fail(function (error) {
                reject(error);
            });
        });
    }

        debugger
        //Id del Proveedor
        getProveedor();
        //e.preventDefault()
        let nombre = $('#name').val()
        let nombre_cien = $('#sci_name').val()
        let foto_prod = $('#foto_prod').val()
        let foto_cult = $('#foto_cult').val()
        let pais = $('#pais').val()
        let prov = $('#prov').val()
        let depa_select = $('#depa_select').val()
        let ciudad_mu = $('#ciudad_mu').val()
        let ciudad_select = $('#ciudad_select').val()
        let corregimiento = $('#corregimiento').val()
        let vereda = $('#vereda').val()
        let comuna = $('#comuna').val()
        let foto_ubicacion = $('#foto_ubicacion').val()
        let coords_posi = $('#marcar-mapa').text()
        let cant_total = $('#cant_total').val()
        let producto = $('#tipo_producto').text()
        let otro = $('#ot span').text().split(".")
        otro.pop()
        let prod = otro.join() + ',' + producto
        let estado = $('#est').val()
        let tama = $('#tam').val()
        let precio_detal = $('#precio_detal').val()
        let precio_mayor = $('#precio_mayor').val()
        let peso_detal = $('#peso_detal').val()
        let peso_mayor = $('#peso_mayor').val()
        let cant_detal = $('#cant_detal').val()
        let cant_mayor = $('#cant_mayor').val()
        let descripcion = $('#descripcion').val()
        let fecha_dispo = $('#fecha_dispo').val()
        let direccion = $('#direc').val()
        let peso_total = $('#peso_total').val()

        let departamento = prov != '' ? prov : depa_select
        let ciudad = ciudad_mu != '' ? ciudad_mu : ciudad_select

        let errores = document.getElementsByClassName('error')

        if (errores.length > 0) {
            toastr.warning("Hay al menos un campo ingresado incorrectamente. Validar que los campos están ingresados correctamente", "Atención")
        } else {
            if (nombre != '' && tipo_prod != '') {
                debugger

                getToken().then(function (dataAuth) {
                    let token = dataAuth.access_token;
                    let type = dataAuth.token_type;

                    //Usuario quien solicita el req

                    //Ambiente de trabajo
                    var environment = backandGlobal.environment;
                    //dataItem
                    

                    var bodyProducto = {
                        "ProveedorFk":`${sessionStorage.ProveedorFk}`,
                        "EstadoCotizacion":"Pendiente",
                        "NombreCient": `${nombre_cien}`,
                        "FotoCult": "fotocult",
                        "Pais": `${pais}`,
                        "Departamento": `${departamento}`,
                        "Ciudad": `${ciudad}`,
                        "Corregimiento": `${corregimiento}`,
                        "Vereda": `${vereda}`,
                        "Comuna": `${comuna}`,
                        "FotoUbica": "fotoubi",
                        //--------------Agregar campos en entidad Producto------------------------
                        "CantidadDetal": `${cant_detal}`,
                        "CantidadMayor": `${cant_mayor}`,
                        "CantidadTotal": `${cant_total}`,
                        "CEDescripcion": `${descripcion}`,
                        "Disponibilidad": `${fecha_dispo}`,
                        "Direccion": `${direccion}`,
                        "PesoTotal": `${peso_total}`,
                        "Estado": `${estado}`,
                        "Foto": "foto", //--------------------------------------
                        "Nombre": `${nombre}`,
                        "PesoDetal": `${peso_detal}`,
                        "PesoMayor": `${peso_mayor}`,
                        "Precio": `${precio_detal}`,
                        "PrecioMayor": `${precio_mayor}`,
                        "Tamano": `${tama}`,
                        "Tipo": `${prod}`,
                        "parameters":
                        {
                            "userId": `${sessionStorage.userId}`,
                            "tablaId": "",
                            "actionId": "00000000-0000-0000-0000-000000000000",
                            "pType": "Guardar",
                            "aType": "ffija",
                            "environment": environment,
                            "lappizFunctionId": "00000000-0000-0000-0000-000000000000"
                        }
                    };

                    $.ajax({
                        async: false,
                        url: `${backandGlobal.api2}/MercaFruta_Lappiz.api/api/lappiz/MercaFruta_Lappiz_Productos`,
                        type: 'POST',
                        data: JSON.stringify(bodyProducto),
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Content-Type', 'application/json');
                            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                        },
                        success: function (result) {

                            let IdProducto = result.Id
                            //let idProv = ajaxQuery(`select Id from MercaFruta_Lappiz_Proveedor where Nombre = '${nombre}' AND Tamano = '${tama}'`, token)

                            let bodyDetalleProd = {
                                "CEProveedor": "",
                                "ProveedorFk":`${sessionStorage.ProveedorFk}`,
                                "ProductoFk": `${IdProducto}`,
                                "parameters": {
                                    "userId": `${sessionStorage.userId}`,
                                    "tablaId": "",
                                    "actionId": "00000000-0000-0000-0000-000000000000",
                                    "pType": "Guardar",
                                    "aType": "ffija",
                                    "environment": environment,
                                    "lappizFunctionId": "00000000-0000-0000-0000-000000000000"
                                }
                            }

                            var url = `${backandGlobal.api2}/MercaFruta_Lappiz.api/api/lappiz/MercaFruta_Lappiz_DetalleProducto`;
                            $.ajax({
                                async: false,
                                url: url,
                                type: 'POST',
                                data: JSON.stringify(bodyDetalleProd),
                                beforeSend: function (xhr) {
                                    xhr.setRequestHeader('Content-Type', 'application/json');
                                    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                                },
                                success: function (result) {

                                },
                                error: function (error) {
                                    console.log('Error en detalle poducto');
                                    console.log(error);
                                    //  toastr.warning('El usuario ya se encuentra registrado en la aplicación');
                                }
                            })


                        },
                        error: function (error) {
                            console.log('Error al añadir el producto')
                            console.log(error)
                        }
                    })

                }, function (error) {
                    toastr.warning("Hubo un inconveniente al intentar obtener el token");
                    console.log("Hubo un inconveniente al intentar obtener el token");
                    console.log(error)
                });

            }
        }
    

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

    function ajaxQuery(query, token) {
        debugger;
        let data
        let newquery = {
            "query": query,
            "parameters": {
                "aType": "execTx",
                "environment": `${backandGlobal.environment}`
            }
        }
        $.ajax({
            async: false,
            url: `${backandGlobal.api2}/MercaFruta_Lappiz.api/api/lappiz/sp/query`,
            type: 'POST',
            data: JSON.stringify(newquery),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            success: function (result) {

                data = result[0]

            },
            error: function (error) {
                console.log(error)
            }
        })

        return data
    }
}, 1000)