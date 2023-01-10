setTimeout(() => {
  debugger
  console.clear()
  sessionStorage.Specie = e.dataItem.CENombre;
  console.log(sessionStorage.Specie);
  let specieQuery = `SELECT vari.CENombre, vari.NombreVariedad, vari.NombreCientifico FROM FrutaNet_Lappiz_Variedad AS vari
  INNER JOIN FrutaNet_Lappiz_Especie AS esp
  ON esp.Id = vari.EspecieFk
  WHERE esp.CENombre = '${sessionStorage.Specie}'`;
  execQuery(specieQuery).then(function (response) {
    var dataResult = response[0];
    //imprimir resultado de la consulta
    console.log(dataResult);
    kendo.jQuery('#3b6e1388-2d28-4312-9bcf-9f5deda72350').data('kendoDropDownList').setDataSource(dataResult);
  }, function (error) {
    console.log(error);
  });
}, 500);

setTimeout(() => {
  debugger
  console.clear()
  let varietyQuery = `SELECT CENombre, NombreVariedad, NombreCientifico FROM FrutaNet_Lappiz_Variedad 
  WHERE Id = '${e.dataItem.Id}'`;
  execQuery(varietyQuery).then(function (response) {
    var dataResult = response[0];
    //imprimir resultado de la consulta
    console.log(dataResult);
    sessionStorage.Variety = e.dataItem.CENombre;
    console.log(sessionStorage.Variety);
    sessionStorage.CommonName = e.dataItem.NombreVariedad;
    console.log(sessionStorage.CommonName);
    sessionStorage.ScientifictName = e.dataItem.NombreCientifico;
    console.log(sessionStorage.ScientifictName);
  }, function (error) {
    console.log(error);
  });
}, 500);

