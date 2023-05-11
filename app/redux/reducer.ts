import { ConfigActions, ConfigState } from './types';
import ConfigConstants from './constants';

export const initialState: ConfigState = {
    inited: false,
    token: undefined,
    dataLogout: undefined,
    username: undefined
};

const ConfigReducer = (
    state: ConfigState = initialState,
    action: ConfigActions
) => {
    switch (action.type) {
        case ConfigConstants.INITED:
            return {
                ...state,
                inited: true
            }
        case ConfigConstants.SAVE_TOKEN:
            return {
                ...state,
                token: action.payload?.token || ''
            }
        case ConfigConstants.RESET_TOKEN:
            return {
                ...state,
                token: undefined
            }
        case ConfigConstants.SAVE_INFO:
            return {
                ...state,
                token: action.payload?.username || ''
            }
        case ConfigConstants.LOG_OUT_SUCCESS:
            return {
                ...state,
                dataLogout: action.payload
            }            
        case ConfigConstants.LOG_OUT_ERROR:
            return {
                ...state,
                dataLogout: action.payload
            }            
        default:
            return state;
    }
};

export default ConfigReducer;