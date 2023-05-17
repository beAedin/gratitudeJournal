import React from 'react';
const Receipt = ({ data }) => {
    const { content, sentiment } = data;

    // 밀리초 단위의 정수값으로 변환
    const seconds = data.date.seconds;
    const nanoseconds = data.date.nanoseconds;
    const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);

    // // Date 객체 생성
    const date = new Date(milliseconds);
    const formattedDate = date
        .toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
        .replace(/\./g, '.');

    return (
        <div class="bg-slate-50 p-10 border-b-2 hover:bg-amber-100 ">
            <h1 class="font-mono text-center ">{content}</h1>
            <h1 class="font-mono text-right text-sm mt-3">{formattedDate}</h1>
            {sentiment && (
                <h1 class="font-mono text-right text-sm mt-3 text-green-800">{sentiment}</h1>
            )}
        </div>
    );
};

export default React.memo(Receipt);
