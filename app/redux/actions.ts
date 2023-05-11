import { action } from 'typesafe-actions';
import { ApiResponseNoData } from '../types';
import ConfigConstants from './constants';

const inited = () => action(ConfigConstants.INITED);

const saveToken = ({
    token
}: { token: string }) => action(ConfigConstants.SAVE_TOKEN, { token });

const resetToken = () => action(ConfigConstants.RESET_TOKEN);

const saveInfo = ({
    username
}: { username: string }) => action(ConfigConstants.SAVE_INFO, { username });

const logout = () => action(ConfigConstants.LOG_OUT);

const logoutSuccess = (
    data: ApiResponseNoData
) => action(ConfigConstants.LOG_OUT_SUCCESS, data);

const logoutError = (
    data: ApiResponseNoData
) => action(ConfigConstants.LOG_OUT_ERROR, data);

export {
    inited,
    saveToken,
    resetToken,
    saveInfo,
    logout,
    logoutSuccess,
    logoutError
};

