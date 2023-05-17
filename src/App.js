import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Main from './pages/Main';
import List from './pages/List';
import AllView from './pages/AllView';
import RandomView from './pages/RandomView';
import Register from './pages/Register';

function App() {
    return (
        <BrowserRouter>
            <div className="App" class="bg-amber-50 w-screen h-screen justify-center">
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/list" element={<List />}></Route>
                    <Route path="/allview" element={<AllView />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    {/* <Route path="/randomView" element={<RandomView />}></Route> */}
                    {/* <Route path="/edit/:id" element={<Edit />}></Route> */}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
