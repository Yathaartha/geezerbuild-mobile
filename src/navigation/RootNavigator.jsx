import {createAppContainer} from '@react-navigation/native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

// Import your screens
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import DrawerContent from './components/DrawerContent';
import SubmissionsScreen from '../screens/submissions/SubmissionsScreen';

// Create the stack navigator for the login screen
const LoginNavigator = createStackNavigator(
  {
    Login: LoginScreen,
  },
  {
    headerMode: 'none',
  },
);

// Create the drawer navigator for other screens
const DrawerNavigator = createDrawerNavigator(
  {
    Home: HomeScreen,
    Submissions: SubmissionsScreen,
  },
  {
    initialRouteName: 'Home',
    contentComponent: DrawerContent,
  },
);

// Create the root navigator
const RootNavigator = createAppContainer(
  createStackNavigator(
    {
      Login: LoginNavigator,
      Drawer: DrawerNavigator,
    },
    {
      initialRouteName: 'Login',
      headerMode: 'none',
    },
  ),
);

export default RootNavigator;
