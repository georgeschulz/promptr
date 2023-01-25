import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/userSlice';

function RestrictedRoutes() {
    const isAuth = useSelector(selectIsAuth);
    return <> {!isAuth ? <Outlet /> : <Navigate to="/folders" /> } </>
}

export default RestrictedRoutes;