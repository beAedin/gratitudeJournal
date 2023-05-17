/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                title: ['Sansita Swashed', ['cursive']],
                content: ['IBM Plex Sans KR', ['sans-serif']],
            },
        },
        container: {
            center: true,
        },
    },
    plugins: [require('tailwind-scrollbar-hide')],
};
