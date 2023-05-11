import { ActionType } from 'typesafe-actions';
import { ApiResponseNoData } from '../types';
import * as actions from './actions';

interface ConfigState {
    inited: boolean,
    token: string | undefined,
    dataLogout: ApiResponseNoData | undefined,
    username: string | undefined
}

type ConfigActions = ActionType<typeof actions>;

export { ConfigActions, ConfigState };
