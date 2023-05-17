import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from '../components/Post';
import PostItem from '../components/PostItem';
import loadData from '../components/loadData';
import { Snackbar, Box, Popper } from '@mui/material';
import { AiOutlineUser } from 'react-icons/ai';
import { db } from './../firebase.js';
import axios from 'axios';
import { startOfDay, endOfDay } from 'date-fns';

// FIREBASE
import {
    collection,
    onSnapshot,
    serverTimestamp,
    addDoc,
    doc,
    deleteDoc,
    getDocs,
    updateDoc,
    query,
    where,
    orderBy,
} from 'firebase/firestore';

import { getAuth, signOut } from 'firebase/auth';

const List = () => {
    const auth = getAuth();
    const contentRef = useRef();
    const navigate = useNavigate();

    const [post, setPost] = useState([]);
    const [postList, setPostList] = useState([]);
    const [content, setContent] = useState('');

    const [date, setDate] = useState(new Date());

    const [editId, setEditId] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const [isLoaded, setIsLoaded] = useState(false);

    const publicUrl = process.env.PUBLIC_URL;
    const header = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;

    const [randomGratitude, setRandomGratitude] = useState();

    const getSentimentFromClova = async () => {
        // const { data } = await axios.post(
        //     `http://localhost:3003/${process.env.REACT_APP_SENTIMENT_URL}`,
        //     { content: content },
        //     {
        //         //withCredentials: true,
        //         headers: {
        //             'X-NCP-APIGW-API-KEY-ID': process.env.REACT_APP_CLOVA_ID,
        //             'X-NCP-APIGW-API-KEY': process.env.REACT_APP_CLOVA_PW,
        //             'Content-Type': 'application/json',
        //         },
        //     }
        // );
        const { data } = await axios.post('http://localhost:3003/naverapi', { content: content });
        return data;
        // return data.sentences[0].sentiment;
    };

    // useEffect(() => {
    //     fetchData();
    // }, []);

    useEffect(() => {
        if (auth) {
            setIsLoaded(true);
        }
    }, [auth]);

    const handleUserIconClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const onLogout = async () => {
        try {
            await signOut(auth);
            //setAuthInfo(initialState);
            navigate('/');
        } catch ({ code, message }) {
            //0 alert(errorMessage[code]);
            alert(message);
        }
    };

    const onChange = useCallback((e) => {
        setContent(e.target.value);
    }, []);

    const openPopper = Boolean(anchorEl);

    // Time - Today filtering
    useEffect(() => {
        loadData(post, setPostList, date);
    }, [date, post]);

    // CREATE
    const onCreate = useCallback(async () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }
        const sentiment = await getSentimentFromClova();
        const gratitudeRef = collection(db, 'gratitude');

        const newDocRef = await addDoc(collection(db, 'gratitude'), {
            uid: auth.currentUser?.uid,
            content: content,
            createdDate: serverTimestamp(),
            date: new Date(),
            heart: 0,
            sentiment: sentiment,
        });

        await updateDoc(doc(db, 'gratitude', newDocRef.id), {
            gratitudeId: newDocRef.id,
        });

        setContent('');
        contentRef.current.focus();
    }, [post]);

    // EDIT
    const onEdit = useCallback(
        (target) => {
            contentRef.current.focus();
            setIsEdit(!isEdit);
            if (isEdit) {
                setContent('');
                return;
            }
            post.map((el) => {
                if (target === el.gratitudeId) {
                    setContent(el.content);
                    setEditId(el.gratitudeId);
                }
            });
        },
        [isEdit, postList]
    );

    const onEditPost = useCallback(async () => {
        setIsEdit(!isEdit);
        const docRef = doc(db, 'gratitude', editId);
        await updateDoc(docRef, {
            content: content,
            createdDate: serverTimestamp(),
            date: new Date(),
        });
        console.log('Document successfully updated!');
        setContent('');
    }, [content, date, editId, isEdit, post]);

    // DELETE
    const onDelete = useCallback(async (gratitudeId) => {
        try {
            const docRef = doc(db, 'gratitude', gratitudeId);
            await deleteDoc(docRef);
            console.log('Document successfully deleted!', gratitudeId);
        } catch (error) {
            console.error('Error removing document: ', error);
        }
        setIsEdit(false);
    }, []);

    // COPY -> navigator

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            isEdit ? onEditPost() : onCreate();
        }
    };

    useEffect(() => {
        if (auth.currentUser?.uid) {
            const q = query(
                collection(db, 'gratitude'),
                where('uid', '==', auth.currentUser?.uid),
                where('date', '>=', startOfDay(date)),
                where('date', '<=', endOfDay(date)),
                orderBy('date', 'desc')
            );

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const updatedPosts = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPost(updatedPosts);
            });
        }
        // return () => {
        //     unsubscribe();
        // };
    }, [auth.currentUser?.uid, db, content]);

    const onChangeDate = (e) => {
        const tempDate = new Date(e.target.value);
        setDate(tempDate);
        console.log(e.target.value);
    };

    const getRandomGratitude = async () => {
        // Gratitude 컬렉션에서 문서 가져오기
        const gratitudeRef = collection(db, 'gratitude');
        const querySnapshot = await getDocs(gratitudeRef);

        // 문서를 배열로 변환
        const documents = querySnapshot.docs.map((doc) => doc.data());

        // 랜덤 인덱스 생성 및 해당 문서 데이터 반환
        const randomIndex = Math.floor(Math.random() * documents.length);
        const randomDocument = documents[randomIndex];
        console.log(randomDocument);
        setRandomGratitude(randomDocument);
    };

    useEffect(() => {
        getRandomGratitude();
    }, []);

    return (
        <div class="flex flex-col items-center h-screen ">
            <h1 class="text-6xl sm:text-7xl text-center font-title pt-20 text-yellow-400">
                I'm Grateful for...
            </h1>
            {isLoaded && (
                <section class="bg-amber-100 w-3/4 h-full mt-24 overflow-auto scrollbar-hide p-12">
                    <div class="flex items-center justify-between mb-10">
                        <h1 class="text-center text-5xl w-full font-title">{header}</h1>

                        <AiOutlineUser
                            onClick={handleUserIconClick}
                            className="cursor-pointer"
                            size={30}
                        ></AiOutlineUser>

                        <Popper open={openPopper} anchorEl={anchorEl}>
                            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                                <p className="text-center text-lg">
                                    Thanks, {auth.currentUser?.email.match(/^[^@]+/)[0]}!
                                </p>
                                {/* <img
                                class="block h-7 hover:cursor-pointer"
                                alt="clipboard"
                                src={`${publicUrl}/clipboard.svg`}
                                onClick={onCopy}
                            ></img> */}
                                <p
                                    className="cursor-pointer text-center text-gray-500"
                                    onClick={onLogout}
                                >
                                    로그아웃
                                </p>
                            </Box>
                        </Popper>
                    </div>

                    <div className="post-wrapper" class="w-full">
                        <div class="w-full flex flex-row-reverse">
                            {/* <input
                            className="date-picker"
                            class=" py-3 px-5 w-full mb-8 rounded-lg text-amber-400"
                            type="date"
                            onChange={onChangeDate}
                            required
                        ></input> */}

                            <div class="py-4 px-5 w-full mb-8 rounded-lg bg-amber-50">
                                <p className="font-title text-center mb-5 text-xl">
                                    Today's Random Gratitude
                                </p>
                                <p className="text-center">{randomGratitude?.content}</p>
                                <p className="text-right">- Someone</p>
                            </div>
                        </div>

                        <Post
                            content={content}
                            onChange={onChange}
                            onCreate={onCreate}
                            contentRef={contentRef}
                            isEdit={isEdit}
                            editId={editId}
                            onEditPost={onEditPost}
                            onKeyDown={onKeyDown}
                        ></Post>
                        <div class="h-full">
                            {post.length > 0 ? (
                                post.map((it) => (
                                    <PostItem
                                        key={it.id}
                                        post={it}
                                        onDelete={onDelete}
                                        onEdit={onEdit}
                                    ></PostItem>
                                ))
                            ) : (
                                <></>
                            )}
                        </div>
                        <div class="flex justify-center">
                            <button
                                onClick={() => {
                                    navigate('/allview');
                                }}
                            >
                                View all of gratitude reciepts
                            </button>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default List;
