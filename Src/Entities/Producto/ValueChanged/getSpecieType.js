setTimeout(() => {
  debugger
  console.clear()
  const id = getFieldValue('f225fbfe-be9e-4b82-a0ba-d8757fd77fd5');
  const specieQuery = `SELECT Id, CENombre FROM FrutaNet_Lappiz_Especie WHERE TipoFk = '${id}'`;
  execQuery(specieQuery).then(function (response) {
    const dataResult = response[0];
    //imprimir resultado de la consulta
    console.log(dataResult);
    sessionStorage.Specie = dataResult[0].CENombre;
    console.log(sessionStorage.Specie);
    kendo.jQuery('#6fe20197-4644-4d4f-80a7-51eae18a1522').data('kendoDropDownList').setDataSource(dataResult);
  }, function (error) {
    console.log(error);
  });
}, 500);