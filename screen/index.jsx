import tw from "../tailwind";
import { LinearGradient } from "expo-linear-gradient";
import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AnimatedCircle } from "../components/AnimatedCircle";
import {
  useGetQuotesQuery,
  useGetRandomPhotosQuery,
  useGetRandomQuotesQuery,
} from "../store/api";
import { useCallback, useEffect, useReducer, useState } from "react";
import { reducer, initialState, ACTION_TYPE } from "./reducer";
import { Blurhash } from "react-native-blurhash";
import { runOnJS } from "react-native-reanimated";
import { useInterval, useTimeout } from "usehooks-ts";

const { height, width } = Dimensions.get("screen");

function isCloser(value, total, threshold) {
  return (
    Math.abs(total - value) <= 3 &&
    Math.abs(total - value) < Math.abs(total - threshold)
  );
}

export default function Screen() {
  const [showImage, setShowImage] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isError, isLoading, refetch, data, error } = useGetRandomQuotesQuery({
    // page: 1,
    limit: 20,
  });

  const {
    photos,
    refetch: refetchPhotos,
    isLoading: isLoadingPhotos,
  } = useGetRandomPhotosQuery(
    {
      client_id: "-pMzFtvXVPDXncpPnEz1x3tro1xylsO-_nMMFQwVPKQ",
    },
    {
      selectFromResult: ({ data, ...values }) => ({
        photos: data,
        ...values,
      }),
    }
  );

  // console.log(
  //   "count",
  //   isCloser(state.currentIndex, state.quotes?.length, 3),
  //   state.currentIndex,
  //   state.quotes.length
  // );

  const isFetch = isCloser(state.currentIndex, state.quotes?.length, 3);

  let test = 1

  const handleQuotes = (payload) => {
    // console.log("isFetch", isFetch, test++);
    // if (isFetch) {
    //   Promise.all([refetch(), refetchPhotos()]);
    //   dispatch({ type: ACTION_TYPE.RESET_INDEX });
    //   // fetch different page
    //   return;
    // }

    setShowImage(false);
    dispatch({
      type: ACTION_TYPE.CURRENT_INDEX,
    });
  };

  useInterval(() => handleQuotes(), 60000);

  useEffect(() => {
    if (data && state.quotes.length === 0) {
      dispatch({ type: ACTION_TYPE.SET_QUOTES, payload: data });
    }
  }, [data]);

  const photo = photos?.[state.currentIndex];
  const quote = state.quotes?.[0];

  if (isLoading || isLoadingPhotos) {
    return <Text>Loading.....</Text>;
  }

  return (
    <View style={tw`h-full relative`}>
      <Blurhash
        blurhash={photo?.blur_hash}
        style={[tw`h-full w-full`, tw.style({ hidden: showImage })]}
      />
      <Image
        source={{
          uri: `${photo?.urls?.raw}&w=${width}&dpr=${PixelRatio.get()}`,
        }}
        onLoadEnd={() => setShowImage(true)}
        style={[tw`h-full w-full`, tw.style({ hidden: !showImage })]}
      />
      <LinearGradient
        // Button Linear Gradient
        end={{ x: 0.5, y: 0.5 }}
        colors={["transparent", "#000"]}
        style={tw`absolute h-96 bottom-0 w-full`}
      >
        <View style={[tw`px-4 justify-end h-[80%]`]}>
          <Text style={tw`text-sm text-accent text-right mb-2`}>
            Inspiration Quotes
          </Text>
          <Text style={tw`text-xl text-white mb-2`}>{quote?.author}</Text>
          <Text style={tw`text-2xl text-white/60 mb-2`}>{quote?.content}</Text>

          <View style={tw`flex-row`}>
            {quote?.tags?.map?.((tag, index) => (
              <Tag key={index} name={tag} />
            ))}
          </View>
        </View>

        {/* bottom content */}
        <View
          style={tw`h-20 w-full flex-row px-4 justify-between items-center`}
        >
          <Text style={tw`text-sm text-white text-right mb-2`}>
            Photo by <Text style={tw`text-primary`}>{photo?.user?.name}</Text>
          </Text>

          <AnimatedCircle isFetch={isFetch} />
        </View>
      </LinearGradient>
    </View>
  );
}

const Tag = ({ name }) => {
  return (
    <View
      style={tw`px-2 h-7 justify-center items-center bg-secondary rounded mr-2`}
    >
      <Text style={tw`text-white `}>{name}</Text>
    </View>
  );
};
