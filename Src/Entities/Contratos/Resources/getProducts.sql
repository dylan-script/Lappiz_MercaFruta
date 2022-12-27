SELECT
  cont.Id,
  cont.Estado,
  cont.FechaCreacion
FROM
  MercaFruta_Lappiz_Contrato AS cont
  INNER JOIN MercaFruta_Lappiz_Productos AS prod ON cont.ProductoFK = prod.Id
  INNER JOIN MercaFruta_Lappiz_Proveedor as prov ON prod.ProveedorFk = prov.Id
WHERE
  prov.Id = 'cc4ed833-12f3-4adb-9b24-940d0187120b'