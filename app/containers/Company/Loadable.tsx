import { lazy, Suspense } from 'react';
import { Spin } from 'antd';
const CompanyPage = lazy(() => import('./index'));

export default () => {
    return (
        <Suspense fallback={<Spin />}>
            <CompanyPage />
        </Suspense>
    )
};
