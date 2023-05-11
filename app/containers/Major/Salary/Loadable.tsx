import { lazy, Suspense } from 'react';
import { Spin } from 'antd';
const TimeKeepingPage = lazy(() => import('./index'));

export default () => {
    return (
        <Suspense fallback={<Spin />}>
            <TimeKeepingPage />
        </Suspense>
    )
};
