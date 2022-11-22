function getData() {
  setTimeout(() => {
    debugger
    console.log(e.dataItem)
    var StringQuery = `UPDATE MercaFruta_Lappiz_Productos SET EstadoCotizacion = 'En Revisión', OData = 'B' WHERE Id = '${e.dataItem.Id}'`;
    execQuery(StringQuery).then(function (response) {
      var dataResult = response[0];
      //imprimir resultado de la consulta
      toastr.info(`Cotización Actualizada. Estado: En Revisión`);
      console.log(dataResult);
    }, function (error) {
      console.log(error);
      toastr.warning('Ha ocurrido un inconveniente. Comunicar con el equipo de soporte.');
    });
    //location.reload();
    var urlList = '#/grids?viewName=MercaFruta_Lappiz_Productos&workspaceId=e5b03115-2a14-4956-833a-10796e1dd2d4&entityId=3236f5d9-3fc5-4cdf-86c3-e1d2b3815b66&dato=Recibidas&appViewId=0d952afb-2a18-4de3-aa61-66f0cd801a15';
    goLocation(urlList);
  }, 3000);
}

function changeOData(status) {
  debugger
  if(status == 'Aprobada'){
    return 'D';
  }
  if(status == 'No Aprobada'){
    return 'E';
  }
  if(status == 'Devuelta con Observación'){
    return 'C';
  }
  return 'N/A'
}

debugger
var EstadoCotizacion = 'b6a7d209-6463-4228-8a62-2c3cc56de315';
var status = getFieldValue(EstadoCotizacion);
console.log(`Estado <${status}>`);
sessionStorage.OData = changeOData(status)
console.log(sessionStorage.OData)