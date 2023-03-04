import base from './index'

export default {
  ...base,
  page: {
    name: 'Route Endpoint',
    description: 'Modify route endpoint on the application'
  },
  field: {
    uri: {
      default: 'Uri'
    },
    description: {
      default: 'Description',
    },
    actions: {
      default: 'Actions'
    },
    model: {
      default: 'Model',
      properties: 'Field list'
    }
  }
}