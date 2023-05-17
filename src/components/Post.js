import React from "react";

const Post = ({
    content,
    onCreate,
    onChange,
    contentRef,
    isEdit,
    onEditPost,
    onKeyDown,
}) => {
    return (
        <div className="post" class="flex w-full h-32 justify-between mb-8">
            <input
                className="create-post"
                class="h-5/6 w-5/6 p-5 mr-2"
                placeholder="How was your day?"
                value={content}
                onChange={onChange}
                onKeyDown={onKeyDown}
                ref={contentRef}
                autoFocus
            ></input>
            {isEdit ? (
                <button
                    class="bg-green-500 w-36 h-5/6 text-white text-base"
                    onClick={onEditPost}
                >
                    THANKS
                </button>
            ) : (
                <button
                    class="bg-amber-300 w-36 h-5/6 text-white text-base"
                    onClick={onCreate}
                >
                    THANKS
                </button>
            )}
        </div>
    );
};
export default React.memo(Post);
