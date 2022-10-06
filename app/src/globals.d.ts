import {RootTabParamList} from '~routes/interface';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}
