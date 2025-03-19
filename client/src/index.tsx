import { createRoot } from 'react-dom/client';
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import '@app/styles/style.scss';
import '@shared/config/i18n/i18n';
import { StoreProvider } from '@app/providers/StoreProvider/ui/StoreProvider';

createRoot(document.getElementById('root')!).render(
    <StoreProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StoreProvider>,
);
