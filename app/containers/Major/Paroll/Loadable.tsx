import { lazy, Suspense } from 'react';
import { Spin } from 'antd';
const PayrollPage = lazy(() => import('./index'));

export default () => {
    return (
        <Suspense fallback={<Spin />}>
            <PayrollPage />
        </Suspense>
    )
};
