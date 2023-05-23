import { lazy, Suspense } from 'react';
import { Spin } from 'antd';
const AdvanceSalaryPage = lazy(() => import('./index'));

export default () => {
    return (
        <Suspense fallback={<Spin />}>
            <AdvanceSalaryPage />
        </Suspense>
    )
};
