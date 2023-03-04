import base from './index'

export default {
  ...base,
  page: {
    name: 'User Management',
    description: 'Manage user list'
  },
  field: {
    name: {
      default: 'Name'
    },
    email: {
      default: 'Email',
    },
    role: {
      default: 'Role'
    },
  }
}