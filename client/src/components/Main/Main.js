import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from '../../pages/Login/Login'
import SignUp from '../../pages/SignUp/SignUp'
import Search from '../../pages/Search/Search'
import ReviewSearch from '../../pages/ReviewSearch/ReviewSearch'
import AddReviews from '../../pages/AddReviews/AddReviews'
import DetailReview from '../../pages/DetailReview/DetailReview'
import DetailPlace from '../../pages/DetailPlace/DetailPlace'
import Favorito from '../../pages/Favorites/Favorite'
import './Main.css'

function Main() {
    return (
        <div className='Main'>
            <Switch>
                <Route path ='/' component={Login} exact/>
                <Route path ='/signup' component={SignUp}/>
                <Route path ='/search' component={Search}/>
                <Route path ='/reviews' component={ReviewSearch}/>
                <Route path ='/addreviews' component={AddReviews}/>
                <Route path ='/detail/:id' component={DetailReview}/>
                <Route path ='/detailPlace/:nombre' component={DetailPlace}/>
                <Route path ='/favorites' component={Favorito}/>
            </Switch>
        </div>
    )
}

export default Main
