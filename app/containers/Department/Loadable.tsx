import { lazy, Suspense } from 'react';
import { Spin } from 'antd';
const DepartmentPage = lazy(() => import('./index'));

export default () => {
    return (
        <Suspense fallback={<Spin />}>
            <DepartmentPage />
        </Suspense>
    )
};
