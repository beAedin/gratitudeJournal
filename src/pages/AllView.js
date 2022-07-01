import { useEffect, useState, useCallback } from "react";

const AllView = () => {
    const [post, setPost] = useState([]);
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("gratitude"));
        setPost(items);
        if (!items) {
            const newData = {
                id: 1,
                content: "",
            };
            const upload = [newData];
            setPost(upload);
            localStorage.setItem("gratitude", JSON.stringify(upload));
            setPost([newData]);
        }
    }, []);

    const exportTxt = useCallback(() => {
        let fileName = "Gratitude_Journal.txt";
        let output = "My Gratitude Journal\n\n";
        post.map((el, i) => {
            output = output + (i + 1) + ". ";
            output += el.content;
            output += "\n";
        });
        const element = document.createElement("a");
        const file = new Blob([output], {
            type: "text/plain",
        });
        element.href = URL.createObjectURL(file);
        element.download = fileName;
        document.body.appendChild(element); // FireFox
        element.click();
    }, []);

    const onDeleteAllPost = () => {
        localStorage.clear();
    };

    const receipt = () => {};
    return (
        <div class="flex flex-col items-center h-screen">
            <h1 class="text-8xl text-center font-title pt-20 text-yellow-400 mb-24">
                Gratitude Receipts
            </h1>
            <div
                className="post-list"
                class="w-11/12 h-4/5 bg-white overflow-auto p-10"
            >
                <h1 class="font-mono text-center text-3xl p-10">
                    You have written {post.length - 1} gratitude jeornals
                </h1>
                {post.length > 1
                    ? post
                          .filter((el) => el.id !== 1)
                          .map((el, i) => {
                              return (
                                  <div class="bg-slate-50 p-10 border-b-2 hover:bg-amber-100">
                                      <h1 class="font-mono text-center ">
                                          {el.content}
                                      </h1>
                                  </div>
                              );
                          })
                    : null}
                <div className="btn-wrapper" class="flex flex-col">
                    <button onClick={() => exportTxt()}>
                        Export Gratitude Receipts
                    </button>
                    <button onClick={onDeleteAllPost}>Delete All</button>
                </div>
            </div>
        </div>
    );
};

export default AllView;
