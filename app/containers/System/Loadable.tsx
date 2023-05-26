import { lazy, Suspense } from 'react';
import { Spin } from 'antd';
const StaffPage = lazy(() => import('./index'));

export default () => {
    return (
        <Suspense fallback={<Spin />}>
            <StaffPage />
        </Suspense>
    )
};
