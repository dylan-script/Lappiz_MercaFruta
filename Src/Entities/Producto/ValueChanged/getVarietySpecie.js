setTimeout(() => {
  debugger
  sessionStorage.Tipo = e.dataItem.Tipo
  console.log(sessionStorage.Tipo)
  sessionStorage.CENombre = e.dataItem.CENombre
  console.log(sessionStorage.CENombre)
  disableField('3b6e1388-2d28-4312-9bcf-9f5deda72350', false);
  let specieQuery = `SELECT NombreVariedad
  FROM FrutaNet_Lappiz_Variedad 
  WHERE  EspecieFk = '${e.dataItem.Id}'`;
  execQuery(specieQuery).then(function (response) {
    var dataResult = response[0];
    //imprimir resultado de la consulta
    console.log(dataResult);
    kendo.jQuery('#3b6e1388-2d28-4312-9bcf-9f5deda72350').data('kendoDropDownList').setDataSource(dataResult);
  }, function (error) {
    console.log(error);
  });
}, 500);

