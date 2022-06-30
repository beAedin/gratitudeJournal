import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
import PostItem from "../components/PostItem";

const List = () => {
    const nextId = useRef(1);
    const [post, setPost] = useState([]);
    const [postList, setPostList] = useState([]);
    const [content, setContent] = useState("");
    const [date, setDate] = useState(new Date());
    const [editId, setEditId] = useState();
    const contentRef = useRef();
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false);

    const header = `${date.getFullYear()}.${
        date.getMonth() + 1
    }.${date.getDate()}`;

    const onChange = (e) => {
        setContent(e.target.value);
    };

    const loadData = () => {
        if (post.length >= 1) {
            const startDay = new Date(
                date.getFullYear(),
                date.getMonth() + 1,
                0,
                0,
                0,
                0
            ).getTime();

            const endDay = new Date(
                date.getFullYear(),
                date.getMonth() + 1,
                0,
                23,
                59,
                59
            ).getTime();

            setPostList(
                post.filter((el) => startDay <= el.date && el.date <= endDay)
            );
        }
    };

    // Time - Today filtering
    useEffect(() => {
        loadData();
    }, [date, post]);

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
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }
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

    // EDIT
    const onEdit = (target) => {
        contentRef.current.focus();
        setIsEdit(!isEdit);
        postList.map((el) => {
            if (target === el.id) {
                setContent(el.content);
                setEditId(el.id);
            }
        });
    };

    const onEditPost = () => {
        setIsEdit(!isEdit);
        post.map((el, i) => {
            if (editId === el.id) {
                el.content = content;
                el.date = new Date(date).getTime();
            }
        });
        localStorage.setItem("gratitude", JSON.stringify(post));
        setContent("");
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
                    <h1 class="text-center text-5xl w-full font-title">
                        {header}
                    </h1>
                </div>
                <div className="post-wrapper">
                    <Post
                        content={content}
                        onChange={onChange}
                        onCreate={onCreate}
                        contentRef={contentRef}
                        isEdit={isEdit}
                        editId={editId}
                        onEditPost={onEditPost}
                    ></Post>
                    <div class="h-full">
                        {!post.id ? (
                            postList.map((it) => (
                                <PostItem
                                    key={it.id}
                                    post={it}
                                    onDelete={onDelete}
                                    onEdit={onEdit}
                                ></PostItem>
                            ))
                        ) : (
                            <>
                                <h1>입력하세요</h1>
                            </>
                        )}
                    </div>
                    <div class="flex justify-center">
                        <button
                            onClick={() => {
                                navigate("/allview");
                            }}
                        >
                            All gratitude
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default List;
