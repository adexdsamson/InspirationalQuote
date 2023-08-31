import { Dimensions, View, TouchableOpacity } from "react-native";
import { Svg, Circle } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  withSpring,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  interpolate,
  withRepeat,
  useDerivedValue,
  runOnJS,
} from "react-native-reanimated";
import { useEffect } from "react";
import tw from "../tailwind";
import { ReText } from 'react-native-redash';

const { width, height } = Dimensions.get("screen");
const size = width - 370;
const strokeWidth = 6;
const { PI } = Math;

const r = (size - strokeWidth) / 2;
const cx = size / 2;
const cy = size / 2;

const AnimatedCircles = Animated.createAnimatedComponent(Circle);

export const AnimatedCircle = ({ onCompleted, isFetch }) => {
  const circumference = r * 2 * PI;
  const progress = useSharedValue(0);

  let test = 1

  const handleCallback = () => {
    // onCompleted()
  }

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 60000 }),
      -1,
      false
    );
  }, []);


  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * progress.value,
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`
  })

  // #44486F

  return (
    <View style={tw`relative`}>
      <Svg width={size} height={size} style={tw`relative z-10`}>
        <Circle
          stroke="#303858"
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
          stroke={"#A6E1FA"}
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
