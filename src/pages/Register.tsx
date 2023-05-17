import { useEffect, useRef, useState } from 'react';
import {
    firebaseAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from '../firebase';
import '../../src/index.css';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [user, setUser] = useState<object>();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isAppropriate, setIsAppropriate] = useState<boolean>();
    const [mode, setMode] = useState('LOGIN');

    const registerEmailInput = useRef<HTMLInputElement>(null);
    const registerPasswordInput = useRef<HTMLInputElement>(null);

    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const onRegister = async (e: any) => {
        e.preventDefault();
        try {
            setErrorMsg('');
            const createdUser = await createUserWithEmailAndPassword(
                firebaseAuth,
                registerEmailInput.current!.value,
                registerPasswordInput.current!.value
            );

            console.log(createdUser);
            setRegisterEmail('');
            setRegisterPassword('');
            setMode('LOGIN');
        } catch (err: any) {
            switch (err.code) {
                case 'auth/weak-password':
                    setErrorMsg('비밀번호는 6자리 이상이어야 합니다');
                    break;
                case 'auth/invalid-email':
                    setErrorMsg('잘못된 이메일 주소입니다');
                    break;
                case 'auth/email-already-in-use':
                    setErrorMsg('이미 가입되어 있는 계정입니다');
                    break;
            }
        }
    };

    // `로그인` 버튼의 onClick에 할당
    const onLogin = async (e: any) => {
        e.preventDefault();
        try {
            const currUserInfo = await signInWithEmailAndPassword(
                firebaseAuth,
                emailInput.current!.value,
                passwordInput.current!.value
            );

            navigate(`/list`);
            // console.log(curUserInfo);
            //setUser(currUserInfo.user);
        } catch (err) {
            setIsAppropriate(false);
            // console.log(err.code);
            /*
      입력한 아이디가 없을 경우 : auth/user-not-found.
      비밀번호가 잘못된 경우 : auth/wrong-password.
      */
        }
    };

    useEffect(() => {}, [isAppropriate]);

    return (
        <div className="flex flex-col h-full w-full px-5">
            {mode == 'REGISTER' && (
                <div className="flex flex-col justify-center h-full w-full items-center">
                    <form
                        onSubmit={onRegister}
                        className="bg-white w-11/12 sm:w-4/6 lg:w-3/6 h-screen my-10 flex flex-col items-center gap-8"
                    >
                        <p className="text-3xl sm:text-5xl font-title mt-3 mb-10 text-yellow-400">
                            Register
                        </p>
                        <div className="bg-amber-200 w-8/12 h-2/4 sm:h-3/4 pt-20 mb-4 rounded-lg">
                            <p className="text-center font-title text-2xl   sm:text-4xl mb-10">
                                Thanks to My Life
                            </p>
                            <div className="">
                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <AiOutlineMail size={20}></AiOutlineMail>

                                    <input
                                        className="w-32 sm:w-48 px-2 bg-amber-50"
                                        placeholder="Email"
                                        type="email"
                                        ref={registerEmailInput}
                                    ></input>
                                </div>

                                <div className="flex items-center justify-center gap-2">
                                    <AiOutlineLock size={20}></AiOutlineLock>

                                    <input
                                        className="w-32 sm:w-48 px-2 bg-amber-50"
                                        placeholder="Password"
                                        type="password"
                                        autoComplete="on"
                                        ref={registerPasswordInput}
                                    ></input>
                                </div>

                                <div className="flex justify-center">
                                    <button className="text-white bg-slate-800 mt-5 sm:mt-6 px-4 py-1">
                                        Submit
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    className="text-blac text-sm mt-3 px-4 py-1 sm:mt-8"
                                    onClick={() => {
                                        setMode('LOGIN');
                                    }}
                                >
                                    Already Having An Account?
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {mode == 'LOGIN' && (
                <div className="flex flex-col justify-center h-full w-full items-center">
                    <form
                        onSubmit={onLogin}
                        className="bg-white w-11/12 sm:w-4/6 lg:w-3/6 h-screen my-10 flex flex-col items-center gap-8"
                    >
                        <p className="text-3xl sm:text-5xl font-title mt-3 mb-10 text-yellow-400">
                            Login
                        </p>
                        <div className="bg-amber-200 w-8/12 h-2/4 sm:h-3/4 pt-20 mb-4 rounded-lg">
                            <p className="text-center font-title text-2xl   sm:text-4xl mb-10 sm:mb-14">
                                Thanks to My Life
                            </p>
                            <div className="">
                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <AiOutlineMail size={20}></AiOutlineMail>

                                    <input
                                        className="w-32 sm:w-48 px-2 bg-amber-50"
                                        placeholder="Email"
                                        type="email"
                                        ref={emailInput}
                                    ></input>
                                </div>

                                <div className="flex items-center justify-center gap-2">
                                    <AiOutlineLock size={20}></AiOutlineLock>

                                    <input
                                        className="w-32 sm:w-48 px-2 bg-amber-50"
                                        placeholder="Password"
                                        type="password"
                                        autoComplete="on"
                                        ref={passwordInput}
                                    ></input>
                                </div>

                                <div className="flex justify-center">
                                    <button className="text-white bg-slate-800 mt-5 sm:mt-6 px-4 py-1">
                                        Login
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    className="text-black text-sm mt-3 px-4 py-1 sm:mt-8"
                                    onClick={() => {
                                        setMode('REGISTER');
                                    }}
                                >
                                    Don't you have an Account?
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Register;
