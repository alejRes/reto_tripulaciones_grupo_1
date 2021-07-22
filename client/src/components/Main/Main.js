import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from '../../pages/Login/Login'
import SignUp from '../../pages/SignUp/SignUp'


function Main() {
    return (
        <div>
            <Switch>
                <Route path ='/' component={Login} exact/>
                <Route path ='/signup' component={SignUp}/>
            </Switch>
        </div>
    )
}

export default Main
