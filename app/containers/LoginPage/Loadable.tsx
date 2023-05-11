import { lazy, Suspense } from 'react';
import { Spin } from 'antd';
const LoginPage = lazy(() => import('./index'));

export default () => {
    return (
        <Suspense fallback={<Spin />}>
            <LoginPage />
        </Suspense>
    )
};
