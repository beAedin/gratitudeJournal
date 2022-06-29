/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                title: ["Sansita Swashed", ["cursive"]],
            },
        },
        container: {
            center: true,
        },
    },
    plugins: [],
};
