import { useContext, useState } from "react"
import { SvgLogo } from "./SvgLogo";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/context/AuthContext";

export const Header = () => {

    const [hiddenList, setHiddenList] = useState(true);

    const navigate = useNavigate();

    //useContext de la autenticacion para saber si el usuario esta logueado
    const { logged, user, logout } = useContext(AuthContext);

    const onLogout = () => {
        logout();
        navigate('/login', {
            replace: true
        })
    }

    const toggleHidden = () => {
        setHiddenList(!hiddenList);
    }

    return (
        <nav className="flex items-center justify-between flex-wrap bg-transparent py-3 px-6 fixed w-full z-10 top-0 border-b">
            <div className="flex items-center flex-shrink-0 text-white w-1/4 mr-6">
                <SvgLogo className={'lp-svgLogo'} svgClass={'headerSvg'} />
            </div>

            <div className="block lg:hidden">
                <button id="nav-toggle" onClick={toggleHidden} className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-black hover:border-black">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                    </svg>
                </button>
            </div>

            <div className={`w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block pt-6 lg:pt-0 ${hiddenList ? 'hidden' : ''}`} id="nav-content">
                <ul className="list-reset lg:flex justify-end flex-1 items-center">
                    <li className="mr-6">
                        {(logged)
                            ? <p className="font-bold"><i className="fa-regular fa-user"></i> {user.username}</p>
                            : <NavLink className="lg:bg-green-400 font-medium rounded-md inline-block py-2 px-6 text-black no-underline" to={'/login'}>Login</NavLink>
                        }
                    </li>
                    {(logged)
                        ? <li>
                            <button onClick={onLogout}>Logout</button>
                        </li>
                        : <li className="mr-3">
                            <NavLink className="lg:bg-green-500 font-medium rounded-md inline-block text-black lg:text-white no-underline hover:text-underline py-2 px-6" to={'/register'}>Register</NavLink>
                        </li>
                    }

                </ul>
            </div>
        </nav>
    )
}
