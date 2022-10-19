setTimeout(() => {
  console.clear()
  let fields = [
    '9f9cd846-c4ad-4025-bfa2-d8ba6afca274',
    '55ea7d30-bf21-427e-9417-c845d0a89db2',
    '7cc595bd-f16f-46ee-ac7d-b7c3d76b2d0d',
    '07ee19e5-4869-4ef2-b93d-29aabd7e5516'
  ]
  if (e.isNew) {
    for (let i = 0; i < fields.length; i++) {
      visibilityField(fields[i], false)
    }
  }

}, 500);