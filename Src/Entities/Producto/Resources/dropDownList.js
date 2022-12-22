setTimeout(function() {
  debugger
  let type = getFieldValue('7c2bd4bf-1690-40b2-9655-0ccc84117dcd')
  var StringQuery = `SELECT vari.NombreVariedad
  FROM FrutaNet_Lappiz_Variedad AS vari
    INNER JOIN FrutaNet_Lappiz_Especie AS esp
    ON vari.EspecieFk = esp.Id
  WHERE  esp.Tipo = '${type}'`;
execQuery(StringQuery).then(function(response){
  var dataResult = response[0];
  //imprimir resultado de la consulta
  console.log(dataResult);
  //console.log(response)
  kendo.jQuery('#3b6e1388-2d28-4312-9bcf-9f5deda72350').data('kendoDropDownList').setDataSource(dataResult);
  
},function(error){
  console.log(error);
});
}, 1000);
