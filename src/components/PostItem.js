import React from "react";
const PostItem = ({ onEdit, onDelete, post }) => {
    const { content, id } = post;
    return (
        <div class="flex flex-col justify-between h-36 items-center mb-14 bg-amber-200 ">
            <div
                className="button-wrapper"
                class="flex flex-row-reverse bg-yellow-400 bg-opacity-70 w-full p-2"
            >
                <button
                    class="p-2 bg-red-600 h-full rounded-full text-white ml-1"
                    onClick={() => onDelete(id)}
                ></button>
                <button
                    class="p-2 bg-green-600 rounded-full h-full bg-opacity-70 text-white"
                    onClick={() => onEdit(id)}
                ></button>
            </div>

            <div class="w-full h-full">
                <h1 class="text-2xl text-gray-600 break-all px-5 text-center pt-6">
                    {content}
                </h1>
            </div>
        </div>
    );
};

export default React.memo(PostItem);
