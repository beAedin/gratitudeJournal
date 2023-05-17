const loadData = (post, setPostList, date) => {
    const day = date.getDate();
    if (post.length >= 1) {
        const startDay = new Date(date.getFullYear(), date.getMonth(), day, 0, 0, 0);

        const endDay = new Date(date.getFullYear(), date.getMonth(), day, 23, 59, 59);

        // setPostList(
        //     post.filter((el) => {
        //         const postDate = el.date.toDate();
        //         return startDay <= postDate && postDate <= endDay;
        //     })
        // );
    }
};

export default loadData;
