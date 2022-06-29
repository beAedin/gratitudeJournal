import { useNavigate } from "react-router-dom";

const Main = () => {
    const navigate = useNavigate();
    return (
        <div class="flex flex-col items-center h-screen justify-center">
            <h1 class="text-8xl text-center font-title mb-32  text-yellow-400">
                Gratitude Journal
            </h1>
            <button
                class="bg-transparent font-extralight tracking-wider text-gray-900 text-5xl hover:scale-110"
                onClick={() => {
                    navigate(`/list`);
                }}
            >
                THANKS
            </button>
        </div>
    );
};

export default Main;
