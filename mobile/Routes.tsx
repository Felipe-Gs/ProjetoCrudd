import { createNativeStackNavigator } from "@react-navigation/native-stack";
const { Navigator, Screen } = createNativeStackNavigator();

import Home from "./src/Pages/Home";
import Login from "./src/Pages/Login";
import VisualizarUsuario from "./src/Pages/VisualizarUsuario";

export function Routes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Screen name="Home" component={Home} />
      <Screen name="Login" component={Login} />
      <Screen name="VisualizarUsuario" component={VisualizarUsuario} />
    </Navigator>
  );
}
