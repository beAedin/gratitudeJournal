const Post = ({ content, onCreate, onChange }) => {
    return (
        <div className="post" class="flex w-full h-32 justify-between">
            <input
                className="create-post"
                class="h-5/6 w-5/6 p-5"
                placeholder="I'm Grateful for..."
                value={content}
                onChange={onChange}
            ></input>
            <button
                class="bg-amber-300 w-36 h-5/6 text-white text-base"
                onClick={onCreate}
            >
                THANKS
            </button>
        </div>
    );
};
export default Post;
