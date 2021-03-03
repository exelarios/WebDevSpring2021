import React, { useContext } from 'react'
import useLocalStorage from './hooks/useLocalStorage'

const UserInfoContext = React.createContext()
const UserInfoUpdateContext = React.createContext()

export function UserInfo() {
    return useContext(UserInfoContext)
}

export function UserInfoUpdate() {
    return useContext(UserInfoUpdateContext)
}

export function UserInfoProvider({ children }) {
    const [token, setToken] = useLocalStorage('token')
    const [name, setName] = useLocalStorage('name')
    const [id, setId] = useLocalStorage('id')

    function updateUser(data) {
        console.log(data)
        setToken(data.token)
        setName(`${data.user.firstName} ${data.user.lastName}`)
        setId(data.user.id)
    }

    return (
        <UserInfoContext.Provider value={{ token, name, id }}>
            <UserInfoUpdateContext.Provider value={updateUser}>
                {children}
            </UserInfoUpdateContext.Provider>
        </UserInfoContext.Provider>
    )
}