import { call, put, takeLatest, select } from 'redux-saga/effects';
import { logoutSuccess, logoutError } from './actions';
import ConfigConstants from './constants';
import request from 'utils/request';
import { selectToken } from './selectors';

function* _logout() {
    const requestURL = `admin/auth/logout`;

    try {
        const token = yield select(selectToken());
        const logoutData = yield call(request, requestURL, 'POST', token);

        if (logoutData?.success) {
            yield put(logoutSuccess(logoutData));
        } else {
            yield put(logoutError(logoutData));
        }
    } catch (error) {
        if (error instanceof Error) {
            yield put(logoutError({
                code: 400, 
                success: false,
                message: error.message || 'Đăng xuất thất bại'
            }))
        }
    }
};

export default function* defaultSaga() {
    yield takeLatest(ConfigConstants.LOG_OUT, _logout);
};
