import { lazy, Suspense } from 'react';
import { Spin } from 'antd';
const IncomeTax = lazy(() => import('./index'));

export default () => {
    return (
        <Suspense fallback={<Spin />}>
            <IncomeTax />
        </Suspense>
    )
};
