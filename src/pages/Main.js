import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const Main = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    console.log(auth);

    const navigateMainOrRegister = () => {
        if (auth.currentUser) {
            navigate(`/list`);
        } else {
            navigate(`/register`);
        }
    };

    return (
        <div class="flex flex-col items-center h-screen pt-64">
            <h1 class="text-5xl sm:text-7xl text-center font-title mb-32  text-yellow-400">
                Gratitude Journal
            </h1>
            <button
                class="bg-transparent font-light tracking-wider text-gray-900 text-3xl sm:text-4xl hover:scale-110 transition"
                onClick={navigateMainOrRegister}
            >
                THANKS
            </button>
        </div>
    );
};

export default Main;
