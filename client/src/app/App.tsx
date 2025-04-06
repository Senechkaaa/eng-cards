import { useCheckAuthQuery } from '@features/AuthByUsername';
import { AppRouter } from './providers/router';
import './styles/style.scss';
import { useEffect } from 'react';

function App() {
    const { refetch } = useCheckAuthQuery();

    useEffect(() => {
        refetch()
    }, [refetch])
    return (
        <div className='app'>
            <AppRouter />
        </div>
    );
}

export default App;
