import React from 'react'

const AuthContext = React.createContext({
  client: { id: 0, secret: '', randomId: '' },
  token: { access_token: '', refresh_token: '' }
})

export default AuthContext
