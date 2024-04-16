import { useContext, useState } from "react"
import { SvgLogo } from "../../GeneralComponents/SvgLogo"
import { NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";


/*Componente Login Page*/
export const LoginPage = () => {

    // const [userInfo, setUserInfo] = useState([{}]); De momento no lo uso
    //useStates necesarios
    const [mail, setMail] = useState('');
    const [passw, setPassw] = useState('');
    const [voidField, setVoidField] = useState(false);
    const [wrongCredentials, setWrongCredentials] = useState(false);

    //useNavigate para la navegacion
    const navigate = useNavigate();

    //useContext para tener acceso al contexto de autenticacion la aplicación
    const { login } = useContext(AuthContext);

    //Constantes y variables globales
    const URL = 'http://localhost:3000/user';
    let fetchConfig, body;


    //Funcion para controlar el email
    const handleMail = (e) => {
        setMail(e.target.value);
    }

    //Funcion para controlar la contraseña
    const handlePassword = (e) => {
        setPassw(e.target.value);
    }

    //Comprobacion para saber si el usuario y su respectiva contraseña existen en la base de datos
    const checkUser = () => {

        //TODO: Habra que encriptar la contraseña antes de realizar la comprobacion ya que en la base de datos estara encriptada
        //Body de la peticion
        body = {
            email: mail,
            passw: passw
        }

        console.log(body.email);

        //Configuración de la peticion
        fetchConfig = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
            cache: 'default'
        }

        //Peticion al backend para comprobar que ese usuario y contraseña existen, si devuelve datos existen, si devuelve un array vacio no.
        fetch(URL, fetchConfig)
            .then(res => res.json())
            .then(data => {
                //TODO: Logica necesaria para mantener el usuario logueado, de momento tan solo tengo un navigate para comprobar el funcionamiento
                if (data.length > 0) { //Si es mayor que 0, hay usuario

                    //Llamamos a la funcion de login del AuthProvider con el usuario que nos llega en la data
                    login(data[0]);

                    navigate('/', {
                        replace: true
                    }); //Navegamos a la Landing Page
                } else {
                    return false; //Si no hay usuario devolvemos false
                }
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault(); //Deshabilitamos el evento por defecto del submit de un formulario

        //Comprobacion para saber si ambos inputs estan rellenos
        if (mail.trim() === '' || passw.trim() === '') {
            //Si alguno esta vacio, voidField sera true y por si estaba activo el error de credenciales incorrectas, lo seteamos a false (para que no se superpongan errores)
            setWrongCredentials(false);
            setVoidField(true);
        } else if (!checkUser()) { //Si hay datos, llamamos al metodo que comprueba si existen en la base de datos

            //En caso de que no exista ese usuario con esa contraseña
            //quitamos el error de input vacio en caso de que estuviera
            setVoidField(false);
            //Colocamos el error de credenciales incorrectos
            setWrongCredentials(true);
        }
    }


    return (
        <>

            <div id="wrapper" className="w-full h-screen">

                <div className="content containerPattern rounded-xl h-full shadow-xl">

                    <div id="sideContainer" className="sm:w-48 md:w-64 lg:w-80 xl:w-96">
                        <div id="loginImg" className=" rounded-xl text-white shadow-2xl"></div>
                    </div>

                    <div className="relative w-full bg-gradient-to-l from-green-900 to-green-600 rounded-l-xl md:rounded-l-none rounded-r-xl sm:shadow-2xl overflow-hidden px-8 py-28 space-y-8 flex flex-col justify-center">

                        <SvgLogo className="loginSvgContainer" svgClass={'loginSvg'} />

                        <h2 className="loginTitle mt-0 text-center text-4xl font-extrabold drop-shadow-md text-slate-100 uppercase poppins-medium">
                            New  concept <span className="text-yellow-100 poppins-bold-italic">gym</span>
                        </h2>
                        <p className="text-center text-gray-200 poppins-medium">
                            Sign in to your account
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-6 text-center flex flex-col justify-center items-center">
                            <div className="relative w-full md:w-2/3 2xl:w-3/6">
                                <input
                                    placeholder="john@example.com"
                                    className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-green-500 poppins-light"
                                    required=""
                                    id="email"
                                    name="email"
                                    type="text"
                                    autoComplete="off"
                                    onChange={handleMail}
                                />
                                <label
                                    className=" poppins-light absolute left-0 -top-3.5 text-slate-300 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-100 peer-focus:text-sm"
                                    htmlFor="email"
                                >Email address
                                </label>
                            </div>
                            <div className="relative w-full md:w-2/3 2xl:w-3/6">
                                <input
                                    placeholder="Password"
                                    className="poppins-light peer h-10 w-full border-b-2 border-gray-300 text-white placeholder-transparent focus:outline-none focus:border-green-500 bg-transparent "
                                    required=""
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="off"
                                    onChange={handlePassword}
                                />
                                <label
                                    className=" poppins-light absolute left-0 -top-3.5 text-slate-300 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-100 peer-focus:text-sm"
                                    htmlFor="password"
                                >Password
                                </label>
                                {/*Condicionales para mostrar errores*/}
                                {(voidField) ? <span className="errorSpan">*All fields are required</span> : <></>}
                                {(wrongCredentials) ? <span className="errorSpan">Wrong email or password</span> : <></>}
                            </div>
                            <button
                                id="signInBut"
                                className="poppins-medium relative w-full md:w-2/3 text-black 2xl:w-3/6 py-2 px-4 bg-yellow-100 hover:bg-amber-200 rounded-md shadow-lg font-semibold transition duration-200"
                                type="submit"
                            >
                                Sign In
                            </button>
                        </form>
                        <div className="text-center text-gray-300 poppins-light">
                            Dont have an account?
                            <NavLink to='/register' className="text-yellow-100 hover:underline ml-2 poppins-light-italic">Sign up</NavLink>
                        </div>

                        <div className="text-slate-200 text-center loginFooter">
                            <p className="w-fit poppins-light text-sm">All rights reserved<strong className="poppins-bold-italic"> © Daniel Vicent Luna</strong></p>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

