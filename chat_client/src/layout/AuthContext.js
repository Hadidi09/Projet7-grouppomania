import { createContext } from 'react'
import { useParams } from 'react-router'

export const AuthContext = createContext({ id: useParams })
