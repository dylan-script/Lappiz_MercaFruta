
SELECT prods.Id, prods.Nombre, prods.EstadoCotizacion, prods.OData, prods.ProveedorFk
FROM MercaFruta_Lappiz_Productos AS prods
WHERE prods.EstadoCotizacion = 'Recibida' AND prods.OData != 'A';