import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';

const selectConfig = (state: ApplicationRootState) => (state as any).config;

const selectInited = () => createSelector(
    selectConfig,
    configState => configState.inited
);

const selectToken = () => createSelector(
    selectConfig,
    configState => configState.token
);

const selectUserName = () => createSelector(
    selectConfig,
    configState => configState.username
);

const selectDataLogout = () => createSelector(
    selectConfig,
    configState => configState.dataLogout
);

export {
    selectInited,
    selectToken,
    selectUserName,
    selectDataLogout
};

