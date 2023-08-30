import tw from "./tailwind";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import { useDeviceContext } from "twrnc";
import { Provider } from "react-redux";
import { store } from './store';
import Quotes from "./screen";

export default function App() {
  useDeviceContext(tw);


  return (
    <Provider store={store}>
      <Quotes />
    </Provider>
  );
}

