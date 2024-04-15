import { useEffect, useState } from "react";
import { SvgLogo } from "../../GeneralComponents/SvgLogo";
import { NavLink, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";


export const RegisterPage = () => {

    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [debouncedUsername] = useDebounce(username, 500);
    const [debouncedEmail] = useDebounce(email, 500);
    const [debouncedRepassword] = useDebounce(repassword, 500);

    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [formError, setFormError] = useState(false);

    //Bandera para saber si el formulario tiene algun error y poder hacer el registro ya que el use state al cambiar, recarga el componente y nunca llegaba a la funcion de hacer el registro a la primera, 
    //habia que hacer dos clicks en el submit cuando ya estaban los datos correctos
    let formErrorFlag = false;

    const [equalPass, setEqualPass] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (debouncedUsername.trim() != '') {
            //Peticion para comprobar si existe el usuario en la base de datos, esta peticion se lanzará cada vez que se actualize el debouncedUsername gracias al hook useEffect
            fetch(`http://localhost:3000/userByUsername/${debouncedUsername}`)
                .then(res => res.json())
                .then(data => {
                    (data.length > 0) ? setUsernameError(true) : setUsernameError(false);
                })
        }
    }, [debouncedUsername])

    useEffect(() => {
        if (debouncedEmail.trim() != '') {
            //Peticion para comprobar si existe el email en la base de datos, esta peticion se lanzará cada vez que se actualize el debouncedEmail gracias al hook useEffect
            fetch(`http://localhost:3000/userByEmail/${debouncedEmail}`)
                .then(res => res.json())
                .then(data => {
                    (data.length > 0) ? setEmailError(true) : setEmailError(false);

                    //TODO: Comprobación extra para saber que el email esta en el formato correcto con una expresión regular
                })
        }
    }, [debouncedEmail])

    useEffect(() => {
        if (debouncedRepassword.trim() != '' && password.trim() != '') {
            (debouncedRepassword !== password) ? setEqualPass(false) : setEqualPass(true);
        }
    }, [debouncedRepassword])

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handleFullname = (e) => {
        setFullname(e.target.value);

    }

    const handleEmail = (e) => {
        setEmail(e.target.value);

    }

    const handlePassword = (e) => {
        setPassword(e.target.value);

    }

    const handleRepassword = (e) => {
        setRepassword(e.target.value);

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (debouncedUsername.trim() === '' || debouncedEmail.trim() === '' || fullname.trim() === '' || password.trim() === '' || repassword.trim() === '') {
            setFormError(true);
            formErrorFlag = true;
            return;
        } else {
            formErrorFlag = false;
            makeRegistration();
        }




    }

    const makeRegistration = () => {
        if (!usernameError && !emailError && !formErrorFlag && equalPass) {
            let body = {
                username: debouncedUsername,
                fullname: fullname,
                email: debouncedEmail,
                passw: password
            }

            let fetchConfig = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }

            fetch('http://localhost:3000/registerUser', fetchConfig)
                .then(res => res.json())
                .then(res => {
                    console.log('usuario registrado');
                    navigate('/');
                })
        }

    }


    return (
        <>

            <div id="wrapper" className="w-full h-screen">

                <div className="content containerPattern rounded-xl h-full shadow-xl">

                    <div className="relative w-full bg-gradient-to-r from-green-900 to-green-600 rounded-r-xl md:rounded-r-none rounded-l-xl sm:shadow-2xl overflow-hidden px-8 py-28 space-y-6 lg:space-y-8 flex flex-col justify-center">

                        <SvgLogo className="registerSvgContainer" svgClass={'loginSvg'} />

                        <h2 className="loginTitle mt-0 text-center text-lg md:text-4xl font-extrabold drop-shadow-md text-slate-100 uppercase poppins-medium">
                            New  concept <span className="text-yellow-100 poppins-bold-italic">gym</span>
                        </h2>
                        <p className="text-center text-xs md:text-lg text-gray-200 poppins-medium">
                            Register your account
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-6 text-center flex flex-col justify-center items-center">
                            <div className="relative w-full md:w-2/3 2xl:w-3/6">
                                <input
                                    placeholder="Username"
                                    className="peer h-8 md:h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-green-500 poppins-light"
                                    required=""
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="off"
                                    onChange={handleUsername}
                                />
                                <label
                                    className=" poppins-light absolute left-0 -top-3.5 text-slate-300 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-100 peer-focus:text-sm"
                                    htmlFor="username"
                                >Username
                                </label>
                                {(usernameError) ? <span className="errorSpan mt-0">Username already taken</span> : <></>}
                            </div>
                            <div className="relative w-full md:w-2/3 2xl:w-3/6">
                                <input
                                    placeholder="Full name"
                                    className="peer h-8 md:h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-green-500 poppins-light"
                                    required=""
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    autoComplete="off"
                                    onChange={handleFullname}
                                />
                                <label
                                    className=" poppins-light absolute left-0 -top-3.5 text-slate-300 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-100 peer-focus:text-sm"
                                    htmlFor="fullname"
                                >Full name
                                </label>
                            </div>
                            <div className="relative w-full md:w-2/3 2xl:w-3/6">
                                <input
                                    placeholder="john@example.com"
                                    className="peer h-8 md:h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-green-500 poppins-light"
                                    required=""
                                    id="email"
                                    name="email"
                                    type="text"
                                    autoComplete="off"
                                    onChange={handleEmail}
                                />
                                <label
                                    className=" poppins-light absolute left-0 -top-3.5 text-slate-300 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-100 peer-focus:text-sm"
                                    htmlFor="email"
                                >Email address
                                </label>
                                {(emailError) ? <span className="errorSpan mt-0">Email already taken</span> : <></>}

                            </div>
                            <div className="relative w-full md:w-2/3 2xl:w-3/6">
                                <input
                                    placeholder="Password"
                                    className="poppins-light peer h-8 md:h-10 w-full border-b-2 border-gray-300 text-white placeholder-transparent focus:outline-none focus:border-green-500 bg-transparent"
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
                            </div>
                            <div className="relative w-full md:w-2/3 2xl:w-3/6">
                                <input
                                    placeholder="Repeat password"
                                    className="poppins-light peer h-8 md:h-10 w-full border-b-2 border-gray-300 text-white placeholder-transparent focus:outline-none focus:border-green-500 bg-transparent"
                                    required=""
                                    id="repeatPassw"
                                    name="repeatPassw"
                                    type="password"
                                    autoComplete="off"
                                    onChange={handleRepassword}
                                />
                                <label
                                    className=" poppins-light absolute left-0 -top-3.5 text-slate-300 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-100 peer-focus:text-sm"
                                    htmlFor="repeatPassw"
                                >Repeat password
                                </label>
                                {(equalPass) ? <></> : <span className="errorSpan mt-0">Passwords must be equal</span>}
                                {(formError) ? <span className="errorSpan mt-0">All fields are required</span> : <></>}

                            </div>
                            <button
                                id="signInBut"
                                className="poppins-medium relative w-full md:w-2/3 text-black 2xl:w-3/6 py-2 px-4 bg-yellow-100 hover:bg-amber-200 rounded-md shadow-lg font-semibold transition duration-200"
                                type="submit"
                            >
                                Sign up
                            </button>
                        </form>
                        <div className="text-center text-sm md:text-lg text-gray-300 poppins-light">
                            Do you already have an account?
                            <NavLink to='/login' className="text-yellow-100 hover:underline ml-2 poppins-light-italic">Sign in</NavLink>
                        </div>

                        <div className="text-slate-200 text-center hidden md:flex loginFooter">
                            <p className="w-fit poppins-light">All rights reserved<strong className="poppins-bold-italic"> © Daniel Vicent Luna</strong></p>
                        </div>

                    </div>

                    <div id="sideContainer" className="sm:w-48 md:w-64 lg:w-80 xl:w-96">
                        <div id="registerImg" className=" rounded-xl text-white shadow-2xl"></div>
                    </div>



                </div>



            </div>

            {/* <p className="text-white text-center footer-text mb-6">All rights reserved © Daniel Vicent Luna</p>
            <div className="bottomWaveContainer">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                    <ellipse cx="100" cy="80" rx="500" ry="50" fill="#24A148" />
                </svg>
            </div> */}



        </>
    )
}

