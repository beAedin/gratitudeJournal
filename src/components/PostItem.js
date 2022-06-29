const PostItem = ({ onDelete, post }) => {
    const { content, id } = post;
    return (
        <div class="flex justify-between h-32 px-8 items-center">
            <h1 class="text-2xl">{content}</h1>
            <button
                class="p-3 bg-black h-full bg-opacity-10 text-white"
                onClick={() => onDelete(id)}
            >
                DELETE
            </button>
        </div>
    );
};

export default PostItem;
