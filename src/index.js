import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import Foother from './components/Foother';

const root = createRoot(document.getElementById('root'))

root.render(
        <BrowserRouter>
            <App/>
            <Foother/>
        </BrowserRouter>
)

