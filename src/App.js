import React from "react";
import { useEffect, useState, useReducer, useRef } from "react";
import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Main from "./pages/Main";
import List from "./pages/List";
import Edit from "./components/Edit";
import AllView from "./pages/RandomView";
import RandomView from "./pages/RandomView";

function App() {
    return (
        <BrowserRouter>
            <div
                className="App"
                class="container bg-amber-50 w-screen h-full justify-center"
            >
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/list" element={<List />}></Route>
                    <Route path="/edit" element={<Edit />}></Route>
                    <Route path="/allview" element={<AllView />}></Route>
                    <Route path="/randomView" element={<RandomView />}></Route>
                    {/* <Route path="/edit/:id" element={<Edit />}></Route> */}
                </Routes>
                {/* <RouteTest /> */}
            </div>
        </BrowserRouter>
    );
}

export default App;
