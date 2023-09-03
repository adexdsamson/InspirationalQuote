import tw from "../tailwind";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Image, PixelRatio, Text, View } from "react-native";
import { AnimatedCircle, Tag, Typography } from "../components";
import { useGetRandomPhotosQuery, useGetRandomQuotesQuery } from "../store/api";
import { useEffect, useReducer, useState } from "react";
import { reducer, initialState, ACTION_TYPE } from "./reducer";
import { Blurhash } from "react-native-blurhash";
import { isValueCloserThanThreshold } from "../utils/helpers";

const { width } = Dimensions.get("screen");

export default function Screen() {
  const [showImage, setShowImage] = useState(false);
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
      client_id: process.env.unSplash_access_key,
    },
    {
      selectFromResult: ({ data, ...values }) => ({
        photos: data,
        ...values,
      }),
    }
  );

  const isFetch = isValueCloserThanThreshold(
    state.currentIndex,
    state.quotes?.length,
    3
  );

  const handleQuotes = () => {
    setShowImage(false);
    dispatch({
      type: ACTION_TYPE.CURRENT_INDEX,
    });
  };

  useEffect(() => {
    // Only updates when there's no `quotes` and `data` is
    // available
    if (data && state.quotes.length === 0) {
      dispatch({ type: ACTION_TYPE.SET_QUOTES, payload: data });
    }
  }, [data]);

  useEffect(() => {
    // Triggers an api call, when the quotes is closer
    // to the end of the total quotes.
    if (isFetch && state.quotes.length !== 0) {
      Promise.all([refetch(), refetchPhotos()]);
      dispatch({ type: ACTION_TYPE.RESET_INDEX });
      return;
    }
  }, [isFetch]);

  const photo = photos?.[state.currentIndex];
  const quote = state.quotes?.[state.currentIndex];

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
          <Typography variant="body" style={tw`text-accent text-right mb-2`}>
            Inspiration Quotes
          </Typography>
          <Typography variant="body2" style={tw`text-white`}>
            {quote?.author}
          </Typography>
          <Typography variant="header" style={tw`text-white/60 mb-4`}>
            {quote?.content}
          </Typography>

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
          <Typography variant="body" style={tw`text-white text-right mb-2`}>
            Photo by{" "}
            <Typography variant="body" style={tw`text-primary mb-0`}>
              {photo?.user?.name}
            </Typography>
          </Typography>

          <AnimatedCircle onCompleted={handleQuotes} />
        </View>
      </LinearGradient>
    </View>
  );
}
