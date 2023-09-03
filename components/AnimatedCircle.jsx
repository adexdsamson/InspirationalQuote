import { Dimensions, View } from "react-native";
import { Svg, Circle } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  withRepeat,
  runOnJS,
} from "react-native-reanimated";
import { useEffect } from "react";
import tw from "../tailwind";
import { ReText } from "react-native-redash";

const { width, height } = Dimensions.get("screen");
const size = width - 370;
const strokeWidth = 3;
const { PI } = Math;

const r = (size - strokeWidth) / 2;
const cx = size / 2;
const cy = size / 2;

const AnimatedCircles = Animated.createAnimatedComponent(Circle);

export const AnimatedCircle = ({ onCompleted, isFetch }) => {
  const circumference = r * 2 * PI;
  const progress = useSharedValue(0);

  /* The `useEffect` hook is used to perform side effects in a React component. In this case, it is used to start the animation of the progress circle. */
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 60000 }, () => runOnJS(onCompleted)()),
      -1,
      false
    );
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * progress.value,
  }));

  return (
    <View style={tw`relative`}>
      <Svg width={size} height={size} style={tw`relative z-10`}>
        <Circle
          stroke="#F6EEE0"
          fill="none"
          {...{
            strokeWidth,
            cx,
            cy,
            r,
          }}
        />
        <AnimatedCircles
          strokeDasharray={circumference}
          stroke={"#C38370"}
          {...{
            animatedProps,
            strokeWidth,
            cx,
            cy,
            r,
          }}
        />
      </Svg>
    </View>
  );
};
