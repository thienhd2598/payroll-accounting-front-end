import { Reducer, Store } from 'redux';
import { RouterState } from 'connected-react-router';
import { Saga } from 'redux-saga';
import { SagaInjectionModes } from 'redux-injectors';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

interface ILinks {
  last_page?: number | null;
  last_page_url?: string | null;
  prev_page_url?: string | null;
  next_page_url?: string | null;
};

export interface IMeta {
  total?: number;
  from?: number;
  to?: number;
  per_page?: number;
  current_page?: number;
};
export interface IPaginateList {
  links: ILinks,
  meta: IMeta
}
export interface ApiResponseNoData {
  code?: number;
  success?: boolean;
  message?: string;
};

export interface ApiResponse<T> extends ApiResponseNoData {
  data: T;
};

export interface InjectedStore extends Store {
  injectedReducers: any;
  injectedSagas: any;
  runSaga(saga: Saga<any[]> | undefined, args: any | undefined): any;
}

export interface InjectReducerParams {
  key: keyof ApplicationRootState;
  reducer: Reducer<any, any>;
}

export interface InjectSagaParams {
  key: keyof ApplicationRootState;
  saga: Saga;
  mode?: SagaInjectionModes;
}

// Your root reducer type, which is your redux state types also
export interface ApplicationRootState {
  readonly router: RouterState;  
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly

  // for testing purposes
  readonly test: any;
}
