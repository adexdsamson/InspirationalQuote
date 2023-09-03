import tw from "./tailwind";
import { StatusBar } from "expo-status-bar";
import { useDeviceContext } from "twrnc";
import {
  useFonts,
  SofiaSansExtraCondensed_400Regular,
  SofiaSansExtraCondensed_500Medium,
  SofiaSansExtraCondensed_700Bold,
  SofiaSansExtraCondensed_600SemiBold
} from "@expo-google-fonts/sofia-sans-extra-condensed";
import { Provider } from "react-redux";
import { store } from "./store";
import Quotes from "./screen";

export default function App() {
  useDeviceContext(tw);
  let [fontsLoaded] = useFonts({
    regular_sofia: SofiaSansExtraCondensed_400Regular,
    medium_sofia: SofiaSansExtraCondensed_500Medium,
    semibold_sofia: SofiaSansExtraCondensed_600SemiBold,
    bold_sofia: SofiaSansExtraCondensed_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Quotes />
      <StatusBar style="auto" />
    </Provider>
  );
}
