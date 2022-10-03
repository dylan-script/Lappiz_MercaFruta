function typeUser() {
    console.clear();
    debugger
    let proveedor = `SELECT * FROM MercaFruta_Lappiz_Proveedor AS prov WHERE prov.UserFK = '${JSON.parse(sessionStorage.LappizUser).Id}'`;
    let comprador = `SELECT * FROM MercaFruta_Lappiz_Comprador AS comp WHERE comp.UserFK = '${JSON.parse(sessionStorage.LappizUser).Id}'`
    let urlquery = `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`;
    let result1 = returnQuery(proveedor, urlquery);
    if(result1 === undefined){
      console.log('No es prov');
      let result2 = returnQuery(comprador, urlquery);
      if(result2 === undefined){
        console.log('No es comp')
      }      
    }
}
function returnQuery(Query, urlquery) {
          debugger;
          var Response = ''
          $.ajax({
              async: false,
              url: urlquery,
              type: 'POST',
              data: JSON.stringify({
                  query: Query,
                  parameters: {
                      aType: "execTx",
                      environment: `${backandGlobal.environment}`
                  }
              }),
              beforeSend: function (xhr) {
                  xhr.setRequestHeader('Content-Type', 'application/json');
                  xhr.setRequestHeader("Authorization", localStorage.Authorization);
              },
              success: function (x) {
                Response = x[0];
                console.log(Response);
                var result;
                result = Response[0].Id;
                console.log(result);
              }
          });
          return result;
      }