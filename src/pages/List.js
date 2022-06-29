import { useState, useRef, useEffect } from "react";
import Post from "../components/Post";
import PostItem from "../components/PostItem";

const List = () => {
    const nextId = useRef(1);
    const [post, setPost] = useState([]);
    const [postList, setPostList] = useState([]);
    const [content, setContent] = useState("");
    const [date, setDate] = useState(new Date());

    const header = `${date.getFullYear()}.${
        date.getMonth() + 1
    }.${date.getDate()}`;

    const onChange = (e) => {
        setContent(e.target.value);
    };

    // Time - Today filtering
    useEffect(() => {
        if (post.length >= 1) {
            const startDay = new Date(
                date.getFullYear(),
                date.getMonth() + 1,
                -1,
                0,
                0,
                0
            ).getTime();
            console.log(startDay);

            const endDay = new Date(
                date.getFullYear(),
                date.getMonth() + 1,
                -1,
                23,
                59,
                59
            ).getTime();

            setPostList(
                post.filter((el) => startDay <= el.date && el.date <= endDay)
            );
        }
    }, [date, post]);

    const increaseDay = () => {
        setDate(
            new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
        );
        console.log(date);
    };

    const decreaseDay = () => {
        setDate(
            new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)
        );
        console.log(date);
    };

    // READ
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("gratitude"));
        setPost(items);
        if (items) {
            nextId.current = parseInt(items[0].id) + 1;
        }
    }, []);

    // CREATE
    const onCreate = () => {
        const newData = {
            id: nextId.current,
            content: content,
            date: new Date(date).getTime(),
        };
        const upload = [newData, ...post];
        setPost(upload);
        localStorage.setItem("gratitude", JSON.stringify(upload));
        setContent("");
        nextId.current += 1;
    };

    // DELETE
    const onDelete = (target) => {
        const newState = post.filter((it) => it.id !== target);
        setPost(newState);
        localStorage.setItem("gratitude", JSON.stringify(newState));
    };

    return (
        <div class="flex flex-col items-center h-screen ">
            <h1 class="mt text-8xl text-center font-title pt-20 text-yellow-400">
                I'm Grateful for...
            </h1>
            <section class="bg-amber-100 w-3/4 h-full mt-24 overflow-auto p-12">
                <div class="flex items-center justify-between mb-10">
                    <button onClick={decreaseDay}>prev</button>
                    <h1 class="text-center text-5xl w-full font-title">
                        {header}
                    </h1>
                    <button onClick={increaseDay}>next</button>
                </div>
                <div className="post-wrapper">
                    <Post
                        content={content}
                        onChange={onChange}
                        onCreate={onCreate}
                    ></Post>
                    <div class="h-full bg-amber-200">
                        {!post.id ? (
                            postList.map((it) => (
                                <PostItem
                                    key={it.id}
                                    post={it}
                                    onDelete={onDelete}
                                ></PostItem>
                            ))
                        ) : (
                            <>
                                <h1>입력하세요</h1>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default List;
