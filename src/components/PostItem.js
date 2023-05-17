import React from 'react';
const PostItem = ({ onEdit, onDelete, post }) => {
    // console.log(post);
    const { content, gratitudeId } = post;
    return (
        <div class="flex flex-col justify-between h-36 items-center mb-14 bg-amber-200">
            <div
                className="button-wrapper"
                class="flex flex-row-reverse bg-amber-300 bg-opacity-70 w-full p-2"
            >
                <button
                    class="p-2 bg-red-600 h-full rounded-full text-white ml-1"
                    onClick={() => onDelete(gratitudeId)}
                ></button>
                <button
                    class="p-2 bg-green-600 rounded-full h-full bg-opacity-70 text-white"
                    onClick={() => onEdit(gratitudeId)}
                ></button>
            </div>

            <div class="w-full h-full flex items-center justify-center">
                <h1 class="block text-2xl break-all font-content text-center">{content}</h1>
            </div>
        </div>
    );
};

export default React.memo(PostItem);
