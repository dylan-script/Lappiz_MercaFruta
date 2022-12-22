SELECT vari.NombreVariedad
FROM FrutaNet_Lappiz_Variedad AS vari
  INNER JOIN FrutaNet_Lappiz_Especie AS esp
  ON vari.EspecieFk = esp.Id
WHERE  esp.Tipo = 'Frutas'