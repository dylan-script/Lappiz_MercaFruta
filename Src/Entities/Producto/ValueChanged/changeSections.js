setTimeout(() => {
  debugger
  const existeProd = getFieldValue('9799c571-6b18-4e01-98f0-1630a2713218');
  const EspecieFk = '6fe20197-4644-4d4f-80a7-51eae18a1522';
  const VariedadFk = '3b6e1388-2d28-4312-9bcf-9f5deda72350';
  const Especie = 'c301790a-0fa8-480c-81aa-a88f42805cbf';
  const Variedad = '758becd9-eb03-405f-9987-3a38b6a24e61';
  const NombreComun = '3b50f4ff-bc13-4d2b-bb1d-e7995f903d60';
  const NombreCientifico = 'b2f38902-1424-49ec-a9d4-352bea7ef57a'
  if (!existeProd) {
    requireField(EspecieFk, false);
    requireField(VariedadFk, false);
    requireField(Especie, true);
    requireField(Variedad, true);
    requireField(NombreComun, true);
    requireField(NombreCientifico, true);
    visibilitySection('63db0e5d-39a2-43fa-9047-80aef86ce742', false)
    visibilitySection('96fcd615-34c8-40ea-a0e5-531b318e6bcf', true)
  } else {
    requireField(EspecieFk, true);
    requireField(VariedadFk, true);
    requireField(Especie, false);
    requireField(Variedad, false);
    requireField(NombreComun, false);
    requireField(NombreCientifico, false);
    visibilitySection('63db0e5d-39a2-43fa-9047-80aef86ce742', true)
    visibilitySection('96fcd615-34c8-40ea-a0e5-531b318e6bcf', false)
  }
}, 100);