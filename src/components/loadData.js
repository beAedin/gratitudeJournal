const loadData = (post, setPostList, date) => {
    const day = date.getDate();
    console.log(day);
    if (post.length >= 1) {
        const startDay = new Date(
            date.getFullYear(),
            date.getMonth(),
            day,
            0,
            0,
            0
        );
        console.log(startDay);

        const endDay = new Date(
            date.getFullYear(),
            date.getMonth(),
            day,
            23,
            59,
            59
        );
        console.log(endDay);

        setPostList(
            post.filter((el) => startDay <= el.date && el.date <= endDay)
        );
    }
};

export default loadData;
