import React from 'react'
import './styling/account.css'
import {useAuth0} from '@auth0/auth0-react'

function Account() {
    const {user, isAuthenticated} = useAuth0()

    console.log("User Information>>>>>>>>>" , user)

    return (
        isAuthenticated && (
            <div className="account__user">
                <div className="user__image">
                    <img className="user__image"src={user.picture} alt=""/>
                </div>
                
                <h2 className="user__name">{user.name}</h2>
                
                <p className="user__email">{user.email}</p>

                <p>{user.nickname}</p>

                <p>Edit</p>

                <p>Delete Account</p>
            </div>
        )
    )
}

export default Account
