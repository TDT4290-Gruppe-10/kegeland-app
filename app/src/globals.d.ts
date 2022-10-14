import {ThemeOverride} from '~constants/theme';
import {RootTabParamList} from '~routes/interface';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }

  namespace ReactNativePaper {
    interface ThemeColors extends ThemeOverride {}
  }
}
