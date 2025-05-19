import { Provider } from 'react-redux';
import { setupStore } from '..';
import { ReactNode } from 'react';
import { StateSchema } from '../config/StateSchema';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: Partial<StateSchema>;
}

export const StoreProvider = (props: StoreProviderProps) => {
    const { children, initialState } = props;
    const store = setupStore(initialState as StateSchema);
    return <Provider store={store}>{children}</Provider>;
};
