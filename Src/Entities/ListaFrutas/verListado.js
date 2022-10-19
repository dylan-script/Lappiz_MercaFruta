var url = location.href;
var urlSplit = url.split("appViewId=");
var idVista = urlSplit[1];

delete sessionStorage.arrProduct;

if (idVista == "d62fe482-8ab0-4322-844d-c5c892598dbc") {
    setTimeout(function () {

        function getToken() {
            var url = `https://designertest.lappiz.io/Api/token`;
            var resolve;
            var datos = {
                grant_type: "password",
                username: "admin@mercafruta.com",
                password: "Lappiz*2022",
                parameters: {
                    aType: "event",
                    environment: backandGlobal.environment,
                },
            };

            $.ajax({
                async: false,
                method: "POST",
                url: url,
                data: datos,
                success: function (response) {
                    resolve = response.access_token;
                },
                error: function (response) {
                },
            });

            return resolve;
        }

        function ajaxQuery(query, token) {
            let data;
            let newquery = {
                query: query,
                parameters: {
                    aType: "execTx",
                    environment: `${backandGlobal.environment}`,
                },
            };

            $.ajax({
                async: false,
                url: `${backandGlobal.api2}/HBS_Lappiz.api/api/lappiz/sp/query`,
                type: "POST",
                data: JSON.stringify(newquery),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },

                success: function (result) {
                    data = result[0];
                },

                error: function (error) {
                    console.log(error);
                },
            });

            return data;
        }

        const token = getToken();

        $("#verFrutas").click(function () {
            debugger;
            $("#dinamico").html("");
            var nombreFruta = "";
            var foto = "";
            var precio = "";
            var peso = "";

            var queryFrutas = `select Id, Nombre, Precio, Foto, Peso from MercaFruta_Lappiz_Productos`;
            var responseQueryFrutas = ajaxQuery(queryFrutas, token);

            if (responseQueryFrutas && responseQueryFrutas.length > 0) {
                responseQueryFrutas.forEach((element) => {
                    nombreFruta = element.Nombre;
                    foto = element.Foto;
                    precio = element.Precio;
                    peso = element.Peso;

                    foto = foto.split("[");
                    foto = foto[1].split("]");
                    foto = foto[0].split(",");

                    var html = `
                            <div class="col-md-3">
                                <div class="card carda mt-2" style="width: 15rem;">
                                    <img src="https://designertest.lappiz.io/Api/api/Upload/UploadImages/${foto[0]}" class="card-img-top" style="width: 100%; alt="hotel">
                                    <div class="card-body">
                                        <h5 class="card-title" id="h5">${nombreFruta}</h5>
                                         <p id="h5">$ ${precio}</p>
                                         <p id="h5">${peso}</p>
                                        <button class="btn btn-sesecundary btnVerModal col-12 h5" id="${element.Id}">Agregar</button>
                                    </div>
                                </div>`;

                    $("#dinamico").append(html);
                });
                verModal();
            } else {
                toastr.warning("Se produjo un error al obtener los datos");
            }
        });

        function verModal() {
            $(".btnVerModal").click(function () {
                $("#divModal").html("");

                var queryIdFrutas = $(this).attr("Id");
                var queryModal = `select Id, Nombre, Foto, Peso from MercaFruta_Lappiz_Productos where Id = '${queryIdFrutas}' `;
                var responseQueryModal = ajaxQuery(queryModal, token);

                if (responseQueryModal) {
                    if (responseQueryModal.length > 0) {
                        var fotoFru = responseQueryModal[0].Foto;
                        var nombreFru = responseQueryModal[0].Nombre.toUpperCase();
                        var id = responseQueryModal[0].Id
                        var pesoFru = responseQueryModal[0].Peso

                        fotoFru = fotoFru.split("[");
                        fotoFru = fotoFru[1].split("]");
                        fotoFru = fotoFru[0].split(",");

                        var modal = ` 
                                <div class="modal-header">
                                <h3 class="modal-title" style="color: #ff6f08;
                                   font-family: verdana;" id="staticBackdropLabel">${nombreFru}</h3>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                </div>
                                <div class="modal-body">
                                     <img src="https://designertest.lappiz.io/Api/api/Upload/UploadImages/${fotoFru[0]}" height=150px width=150px alt="" style="border-radius:90%; margin-left:30%;">
                                </div>  
                                <div class="modal-body">
                                    <p style="text-align:center; font-size:1.5em; margin-bottom:3%;">¡Éste producto se comercializa por (<b>${pesoFru})</b></p>
                                    <div style="margin-left:30%">
                                        <label for="cantidad" style="text-align:center; font-size:1rem;">¿Que cantidad desea llevar?</label>
                                        <input type="number" class="form-control col-6" id="cantidad">
                                    </div>
                                </div>  
                            <div class="modal-footer">
                                <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
                                <button type="button" id="${id}" class="btn btn-primary col-12 btnAgregarModal">Agregar</button>
                            </div>  `;

                        $("#divModal").append(modal);
                        $("#staticBackdrop").modal("show");
                        setTimeout(() => {
                            $(".modal-backdrop").hide();
                        }, 1000);
                        $("body").css("overflow-y", "auto");
                        agregarCarrito()
                    }
                }
            });
        }

        function agregarCarrito() {
            $(".btnAgregarModal").click(function () {
                debugger;
                var producto = [];

                var queryIdCarrito = $(this).attr("Id");
                var queryCarrito = `select Id, Nombre, Precio, Peso from MercaFruta_Lappiz_Productos where Id = '${queryIdCarrito}'`
                var responsequeryCarrito = ajaxQuery(queryCarrito, token)
                if (responsequeryCarrito) {
                    if (responsequeryCarrito.length > 0) {
                        var nombreF = responsequeryCarrito[0].Nombre
                        var precioF = responsequeryCarrito[0].Precio
                        var pesoF = responsequeryCarrito[0].Peso
                        var cantidad = $("#cantidad").val();
                        var id = responsequeryCarrito[0].Id;

                        var totalPagar = parseFloat(precioF) * parseFloat(cantidad)

                        var objProdutos = {
                            id: id,
                            nombre: nombreF,
                            precio: precioF,
                            peso: pesoF,
                            cantidad: cantidad,
                            totalPagar: totalPagar
                        }

                        if (sessionStorage.arrProduct) {
                            var arr = JSON.parse(sessionStorage.arrProduct);
                            arr.push(objProdutos)
                            $("#contador")[0].innerText = arr.length;
                            sessionStorage.arrProduct = JSON.stringify(arr);
                        } else {
                            producto.push(objProdutos)
                            $("#contador")[0].innerText = producto.length;
                            sessionStorage.arrProduct = JSON.stringify(producto);
                        }
                    }
                }
                toastr.info("Se agregó un artículo al carrito")
            })
        }

        $("#carrito").click(function () {
            debugger;
            $("#divModal2").html('');
            var factura = JSON.parse(sessionStorage.arrProduct);

            var htmlFactura = '', totalFactura = 0;
            if (factura.length > 0) {
                factura.forEach(element => {
                    var nombre = element.nombre
                    var precio = element.precio
                    var cantidad = element.cantidad
                    var total = element.totalPagar

                    totalFactura += parseFloat(total);
                    htmlFactura += `
                    <tr>
                        <td>${nombre}</td>
                        <td>$${precio}</td>
                        <td>${cantidad}</td>
                        <td>$${total}</td>
                    </tr>`;
                });
            }
            

            var modalFactura = ` 
                <div class="modal-header">
                <h3 class="modal-title" style="color: #ff6f08;
                font-family: verdana;" id="staticBackdropLabel">Factura</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                   <table style="width: 100%"  border="3"  align="center" cellspacing="2" id="tabla">
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                        </tr>
                        ${htmlFactura}
                   </table>
                   <p style="text-align: center; margin-top:3%;">Total pedido: <b>$${totalFactura}<p></label>
                   <div style="margin-left:30%">
                   <label for="cliente" style="text-align:center; font-size:1rem;">Nombre del cliente</label>
                   <input type="text" class="form-control col-6" id="nombreCliente">
                    </div>
                   <div class="modal-footer">
                   <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
                   <button type="button" class="btn btn-primary btnEnvPed" id="enviarPedido">Enviar pedido</button>
                   </div>
                </div> `
            $("#divModal2").append(modalFactura);
            $("#staticBackdrop2").modal("show");
            $("#enviarPedido").click(function () {
                debugger;
                var nombre = $("#nombreCliente").val()
                var fecha = new Date()
                var data = {
                    Fecha: fecha,
                    NombreCliente: nombre,
                    TotalFactura: totalFactura,
                    MercaFruta_Lappiz_DetallePedido: [],
                    parameters: {
                        userId: "594b1e5c-040b-4cb7-8545-beeb48fbaaad",
                        appViewId: "08feb850-7e50-4eb9-9dad-e7ae68b1a3c9",
                        pType: "Guardar",
                        aType: "view",
                        environment: "TEST"
                    }
                }

                let arreglo = JSON.parse(sessionStorage.arrProduct)

                arreglo.forEach(element => {
                    data.MercaFruta_Lappiz_DetallePedido.push({
                        ProductoFK: element.id,
                        Cantidad: element.cantidad,
                        ValorUnitario: element.precio,
                        SubTotal: element.totalPagar,
                        Created_by: "594b1e5c-040b-4cb7-8545-beeb48fbaaad",
                        Edited_by: "594b1e5c-040b-4cb7-8545-beeb48fbaaad",
                    })
                });

                console.log(data)

                var settings = {
                    "url": "https://txtest.lappiz.io/MercaFruta_Lappiz.api/api/lappiz/MercaFruta_Lappiz_Pedido",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Authorization": "Bearer 6VU0s9R7I5SPUR1Q_vzj9A1WsO9pQasZ-HZUrEStqLoXTos-EN-PtNLHlf4m6LIqg-k1NQSGxtDiikBeorQcPozqPomfKu3mx8DzPLU_-71anOA3IaDA3VWJYUGBUoJKOIPYjmXEtjR_AtMs8w7ycIAk5W7sO9xW_SwIK_sb7yMNvlbiC64dAVInB3yT6BMZ-i2tgD0-oKNxoL9g_J3N-KyBzrTQ9nlvNMnNB3I_6lz1R-Yhgfj8SydtT7K-ifvoSj2X3CfsSsyPhBv6BocHypKu_DMnS9TsRpiMSGW-RMAUg1Ct8vhEbdrkEWZVRoZN5w1nQTmog_mN4gCAH-FHOEc7vbr306u2rm0vvLrwkOD9g0-l7JZxmFcOBHpwt7G6mbZjDozFNqHc-H3Q9es-GpIvkltyRx24N59XvG1PLgw5hQOdXCRUlmyOUjT6hvCRO8ov_S7Pcx4ZBww8NWsPfYe-3toaLP5lqDJTFqH22pRvDX7knHW8JF_Idt-ipqAoDYNiyHZKC71iC8pwH_zyavEmjnP4dBGL9F2SFin9OSo",
                        "Content-Type": "application/json"
                    },
                    "data": JSON.stringify(data),
                };

                $.ajax(settings).done(function (response) {
                    var settings = {
                        "url": "https://txtest.lappiz.io/MercaFruta_Lappiz.api/api/utiles/sendEmail",
                        "method": "POST",
                        "timeout": 0,
                        "headers": {
                            "Authorization": "Bearer 6VU0s9R7I5SPUR1Q_vzj9A1WsO9pQasZ-HZUrEStqLoXTos-EN-PtNLHlf4m6LIqg-k1NQSGxtDiikBeorQcPozqPomfKu3mx8DzPLU_-71anOA3IaDA3VWJYUGBUoJKOIPYjmXEtjR_AtMs8w7ycIAk5W7sO9xW_SwIK_sb7yMNvlbiC64dAVInB3yT6BMZ-i2tgD0-oKNxoL9g_J3N-KyBzrTQ9nlvNMnNB3I_6lz1R-Yhgfj8SydtT7K-ifvoSj2X3CfsSsyPhBv6BocHypKu_DMnS9TsRpiMSGW-RMAUg1Ct8vhEbdrkEWZVRoZN5w1nQTmog_mN4gCAH-FHOEc7vbr306u2rm0vvLrwkOD9g0-l7JZxmFcOBHpwt7G6mbZjDozFNqHc-H3Q9es-GpIvkltyRx24N59XvG1PLgw5hQOdXCRUlmyOUjT6hvCRO8ov_S7Pcx4ZBww8NWsPfYe-3toaLP5lqDJTFqH22pRvDX7knHW8JF_Idt-ipqAoDYNiyHZKC71iC8pwH_zyavEmjnP4dBGL9F2SFin9OSo",
                            "Content-Type": "application/json"
                        },
                        "data": JSON.stringify({
                            "to": "simon.sanchez@lappiz.io",
                            "subject": `Muy buenos dias señor(a): ${response.NombreCliente}`,
                            "text": "Texto",
                            "parameters": {
                                "aType": "sendMail",
                                "environment": "TEST"
                            },
                            "html": `<p>Cordial saludo estimado cliente</p>
                          <p>El presente correo es para notificarle<br>
                              que su pedido número ${response.Numero} se ha enviado satisfactoriamente por un total de $ ${response.TotalFactura}.
                          </p>
                          <p>Gracias por su compra</p>
                          `
                        }),
                    };
    
                    $.ajax(settings).done(function (response) {
                        toastr.success('El pedido ha sido registrado correctamente');
                    });
                }).fail(function (error) {
                    toastr.warning('Ha ocurrido un error al registrar el pedido');
                });
            })
            setTimeout(() => {
                $(".modal-backdrop").hide();
            }, 1000);
            $("body").css("overflow-y", "auto");
        })
    }, 1000);
}