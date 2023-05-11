import { lazy, Suspense } from 'react';
import { Spin } from 'antd';
const PositionPage = lazy(() => import('./index'));

export default () => {
    return (
        <Suspense fallback={<Spin />}>
            <PositionPage />
        </Suspense>
    )
};
