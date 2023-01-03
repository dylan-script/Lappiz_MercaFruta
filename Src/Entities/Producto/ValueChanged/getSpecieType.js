setTimeout(() => {
  console.clear()
  let type = getFieldValue('7c2bd4bf-1690-40b2-9655-0ccc84117dcd');
  let specieQuery = `SELECT CENombre FROM FrutaNet_Lappiz_Especie WHERE Tipo = '${type}'`;
  execQuery(specieQuery).then(function (response) {
    var dataResult = response[0];
    //imprimir resultado de la consulta
    console.log(dataResult);
    sessionStorage.Specie = dataResult[0].CENombre;
    console.log(sessionStorage.Specie);
    kendo.jQuery('#6fe20197-4644-4d4f-80a7-51eae18a1522').data('kendoDropDownList').setDataSource(dataResult);
  }, function (error) {
    console.log(error);
  });
}, 500);