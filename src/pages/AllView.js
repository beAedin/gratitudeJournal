import { useEffect, useState, useCallback } from 'react';
import Receipt from '../components/Receipt';
import { useNavigate } from 'react-router-dom';
import { db } from './../firebase.js';
import { getAuth } from 'firebase/auth';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

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
    startAfter,
    limit,
} from 'firebase/firestore';

const AllView = () => {
    const auth = getAuth();
    const [post, setPost] = useState([]);
    const [lastPost, setLastPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sentiment, setSentiment] = useState([]);
    const [sentence, setSentence] = useState('');
    const [data, setData] = useState();
    const date = new Date();
    const navigate = useNavigate();
    const publicUrl = process.env.PUBLIC_URL;

    // 새로운 데이터를 가져오는 함수
    const loadMore = useCallback(async () => {
        if (loading || !auth.currentUser?.uid) return;
        setLoading(true);
        if (auth.currentUser?.uid) {
            const q = query(
                collection(db, 'gratitude'),
                where('uid', '==', auth.currentUser?.uid),
                orderBy('date', 'desc'),
                lastPost ? startAfter(lastPost) : null, // 마지막 포스트가 있으면 해당 포스트 이후의 데이터를 가져옴
                limit(10) // 한 번에 최대 10개의 데이터를 가져옴
            );
            const snapshot = await getDocs(q);
            const newPosts = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPost((prevPosts) => [...prevPosts, ...newPosts]);
            setLastPost(snapshot.docs[snapshot.docs.length - 1]);
            setLoading(false);
        }
    }, [auth.currentUser?.uid, db, lastPost, loading]);

    // 초기 데이터 가져오기
    useEffect(() => {
        if (auth.currentUser?.uid) {
            const q = query(
                collection(db, 'gratitude'),
                where('uid', '==', auth.currentUser?.uid),
                orderBy('date', 'desc'),
                limit(10)
            );
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const updatedPosts = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPost(updatedPosts);
                setLastPost(snapshot.docs[snapshot.docs.length - 1]);
            });
        }

        // return () => {
        //     unsubscribe();
        // };
    }, [auth.currentUser?.uid, db]);

    // 스크롤 이벤트 핸들러
    const handleScroll = useCallback(() => {
        if (loading || !auth) return;
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
            loadMore();
        }
    }, [loading, loadMore]);

    // 스크롤 이벤트 리스너 등록
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        const sentiments = post.reduce((acc, curr) => {
            const sentiment = curr.sentiment;
            if (sentiment) {
                acc[sentiment] = acc[sentiment] ? acc[sentiment] + 1 : 1;
            }
            return acc;
        }, {});
        setSentiment(sentiments);

        const maxValue = Object.keys(sentiments).reduce(
            (a, b) => (sentiments[a] > sentiments[b] ? a : b),
            ''
        );

        console.log(maxValue);

        if (maxValue) {
            if (maxValue === 'positive') {
                setSentence(`You're doing a good job.Keep Going!!`);
            } else if (maxValue === 'neutral') {
                setSentence('Just keep doing what you are doing!!');
            } else if (maxValue === 'negative') {
                setSentence("It's Okay. You're doing great!!");
            }
        }

        setData({
            labels: ['Sentiment'],
            datasets: [
                {
                    type: 'bar',
                    label: 'Positive',
                    backgroundColor: 'rgb(255, 99, 132)',
                    data: [sentiments['positive']],
                },
                {
                    type: 'bar',
                    label: 'Neutral',
                    backgroundColor: '#ffea00',
                    data: [sentiments['neutral']],
                },
                {
                    type: 'bar',
                    label: 'Negative',
                    backgroundColor: 'rgb(75, 192, 192)',
                    data: [sentiments['negative']],
                },
            ],
        });
    }, [post]);

    const exportTxt = useCallback((post) => {
        let fileName = 'Gratitude_Journal.txt';

        setPost(post.reverse());
        let output = '';
        post.map((el, i) => {
            output = output + (i + 1) + '. ';
            output += el.content;
            output += '\n';
        });
        output = 'My Gratitude Journal\n\n' + output;
        const element = document.createElement('a');
        const file = new Blob([output], {
            type: 'text/plain',
        });
        element.href = URL.createObjectURL(file);
        element.download = fileName;
        document.body.appendChild(element); // FireFox
        element.click();
    }, []);

    const onDeleteAllPost = () => {
        localStorage.clear();
        window.location.replace('/allview');
    };

    return (
        <div class="flex flex-col items-center h-full  bg-amber-50">
            <h1 class="text-8xl text-center font-title pt-20 text-yellow-400 mb-24">
                Gratitude Receipts
            </h1>

            <div className="post-list" class="w-3/4 h-4/5 bg-white p-10">
                <img
                    class="block h-7 hover:cursor-pointer"
                    alt="backspace"
                    src={`${publicUrl}/backspace.svg`}
                    onClick={() => navigate(-1)}
                ></img>
                <h1 class="font-mono text-center  text-3xl pb-20 mt-10 ">
                    Enjoy Your Life through Gratitude
                </h1>

                {data && <Line type="line" data={data} />}
                <div>
                    {sentence && (
                        <h1 className="mt-10 mb-10 text-rose-600 text-5xl text-center font-title">
                            {sentence}
                        </h1>
                    )}
                </div>

                <div className="py-4">
                    {post.length >= 1
                        ? post
                              .filter((el) => el.id !== 1)
                              .map((el, i) => {
                                  console.log(el);
                                  let day = new Date(parseInt(el.date)).toLocaleDateString();
                                  return <Receipt data={el} />;
                              })
                        : null}
                </div>
                <div className="btn-wrapper" class="flex flex-col items-center">
                    <button
                        class=" mt-10 mb-3 w-fit hover:scale-110"
                        onClick={() => exportTxt(post)}
                    >
                        Export Gratitude Receipts
                    </button>
                    <button class="text-red-500 hover:scale-110 w-fit" onClick={onDeleteAllPost}>
                        Delete All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllView;
