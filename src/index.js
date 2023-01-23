import 'babel-polyfill';
import React from 'react';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container);

root.render(<App />);
registerServiceWorker();
