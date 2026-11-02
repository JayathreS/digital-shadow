import React from 'react';import {createRoot} from 'react-dom/client';import {HashRouter} from 'react-router-dom';import App from './App.jsx';import './styles.css'
createRoot(document.getElementById('root')).render(<HashRouter><App/></HashRouter>)
if('serviceWorker' in navigator&&import.meta.env.PROD)addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}))
