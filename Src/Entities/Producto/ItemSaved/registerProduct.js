

setTimeout(() => {
  setTimeout(() => {
    debugger;
    getProveedor();
    let obj_detalle_prod = {}
    let proveedor_fk = sessionStorage.ProveedorFk
    let producto_fk = e.dataItem.Id
    let nombre = e.dataItem.Nombre

    obj_detalle_prod = {
      ProveedorFk: proveedor_fk,
      ProductoFk: producto_fk,
      Nombre: nombre,
      Created_by: `${sessionStorage.userId}`,
      EventType: "Insertar",
      Edited_by: `${sessionStorage.userId}`,
      tenantId: "null",
      parameters: {
        "userId": `${sessionStorage.userId}`,
        "appViewId": 'fbc24a95-a5ea-4aa8-9b63-1fc1c69b5ffd',
        "pType": "Guardar",
        "aType": "view",
        "environment": "TEST"
      }
    }

    getToken().then(function (dataAuth) {
      let token = dataAuth.access_token;
      $.ajax({
        async: false,
        url: `${backandGlobal.api2}/FrutaNet_Lappiz.api/api/lappiz/FrutaNet_Lappiz_DetalleProducto`,
        type: 'POST',
        data: JSON.stringify(obj_detalle_prod),
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: function (result) {
          console.log('Id DetalleProducto', result.Id)
        },
        error: function (error) {
          console.log('Error al añadir el detalle producto')
          console.log(error)
        }
      })

    }, function (error) {
      toastr.warning("Hubo un inconveniente al intentar obtener el token");
      console.log("Hubo un inconveniente al intentar obtener el token");
      console.log(error)
    });

  }, 1000)

  function getProveedor() {
    var StringQuery = `SELECT * FROM FrutaNet_Lappiz_Proveedor WHERE UserFK = '${JSON.parse(sessionStorage.LappizUser).Id}'`;
    execQuery(StringQuery).then(function (response) {
      var dataResult = response[0];
      //imprimir resultado de la consulta

      console.log(dataResult);
      console.log(`Id Proveedor del dataResult: ${dataResult[0].Id}`);
      sessionStorage.ProveedorFk = dataResult[0].Id;
      console.log(`Id Proveedor en el sessionStorage: ${sessionStorage.ProveedorFk}`);
    }, function (error) {
      console.log(error);
    });
  }

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


}, 1500)