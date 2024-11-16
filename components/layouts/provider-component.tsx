'use client';
import App from '@/App';
import { AppStore, makeStore } from '@/store';
import { Provider } from 'react-redux';
import React, { ReactNode, Suspense, useRef } from 'react';
import Loading from '@/components/layouts/loading';

interface IProps {
    children?: ReactNode;
}

const ProviderComponent = ({ children }: IProps) => {
    const storeRef = useRef<AppStore>();
    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    return (
        <Provider store={storeRef.current}>
            <Suspense fallback={<Loading />}>
                <App>{children} </App>
            </Suspense>
        </Provider>
    );
};

export default ProviderComponent;
