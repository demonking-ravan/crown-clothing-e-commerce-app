import { Fragment, useContext } from "react";
import { Outlet, Link } from 'react-router-dom';

import CartIcon from "../../components/card-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { ReactComponent as Crwn } from '../../assets/crown.svg';

import { CartContext } from '../../context/cart.context';
import { UserContext } from '../../context/user.context';
import './navigation.styles.scss'

import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
        <Fragment>
            <div className="navigation"> 
                <Link className="logo-container" to='/'>
                    <Crwn className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop' >
                        SHOP
                    </Link>
                    {currentUser ? (
                        <span className="nav-link" onClick={ signOutUser }>SIGN-OUT</span>
                    ) : (
                        <Link className="nav-link" to='/auth'>
                            SIGN-IN
                        </Link>
                    )}
                    <CartIcon/>               
                </div>
                {isCartOpen && <CartDropdown/>}
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;