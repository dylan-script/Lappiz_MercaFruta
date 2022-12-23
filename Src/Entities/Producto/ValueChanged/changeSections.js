let existeProd = getFieldValue('8f3af676-bf20-49d5-8b93-c2442d533384');
if (existeProd == 'NO') {
  visibilitySection('63db0e5d-39a2-43fa-9047-80aef86ce742', true)
  visibilitySection('96fcd615-34c8-40ea-a0e5-531b318e6bcf', false)
} else {
  visibilitySection('63db0e5d-39a2-43fa-9047-80aef86ce742', false)
  visibilitySection('96fcd615-34c8-40ea-a0e5-531b318e6bcf', true)
}