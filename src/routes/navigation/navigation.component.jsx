import { Fragment } from "react";
import { Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";

import CartIcon from "../../components/card-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { ReactComponent as Crwn } from '../../assets/crown.svg';

import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import { NavigationContainer, LogoContainer, NavLinks, NavLink} from './navigation.styles.jsx'


const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser)
    const  isCartOpen  = useSelector(selectIsCartOpen)

    return (
        <Fragment>
            <NavigationContainer> 
                <LogoContainer to='/'>
                    <Crwn className="logo" />
                </LogoContainer>
                <NavLinks>
                    <NavLink className="nav-link" to='/shop' >
                        SHOP
                    </NavLink>
                    {currentUser ? (
                        <NavLink as='span' onClick={ signOutUser }>SIGN-OUT</NavLink>
                    ) : (
                        <NavLink className="nav-link" to='/auth'>
                            SIGN-IN
                        </NavLink>
                    )}
                    <CartIcon/>               
                </NavLinks>
                {isCartOpen && <CartDropdown/>}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;