import {Platform} from 'react-native';

const isWeb = Platform.OS === 'web';

const RouterPackage = isWeb
  ? require('react-router-dom')
  : require('react-router-native');

export const Router = isWeb
  ? RouterPackage.BrowserRouter
  : RouterPackage.NativeRouter;

export default RouterPackage;
