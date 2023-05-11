import { lazy, Suspense } from 'react';
import { Spin } from 'antd';
const RegisterPage = lazy(() => import('./index'));

export default () => {
    return (
        <Suspense fallback={<Spin />}>
            <RegisterPage />
        </Suspense>
    )
};
