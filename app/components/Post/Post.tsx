import { StyleSheet } from "react-native";
import { AVPlaybackStatus, Video } from "expo-av";
import React from "react";
import { Button, View, Text, Box } from "native-base";
import Badges from "../BadgeBox";
import { AntDesign } from "@expo/vector-icons";
import PostButtons from "./PostButtons";

type PostProps = {
  name: string;
  videoUrl?: string | null;
  header?: string | null;
  text?: string | null;
  badges: string | string[];
  upvotes: number | null;
  downvotes: number | null;
};

const Post: React.FC<PostProps> = (props) => {
  const video = React.useRef<any>(null);
  const [status, setStatus] = React.useState({} as AVPlaybackStatus);

  return (
    <Box
      marginTop={props.name === "0" ? 0 : 4}
      px={4}
      py={2}
      // borderRadius="2xl"
      // borderTopColor="gray.800"
      // borderTopColor="gray.300"
      borderWidth={1}
      // bg={"gray.900"}
      bg={{
        linearGradient: {
          start: [0, 0],
          end: [1, 1],
          colors: ["gray.900", "black"],
        },
      }}
    >
      <Badges badgeTexts={props.badges} />
      {props.header && (
        <Text color="gray.100" fontSize={22}>
          {props.header}
        </Text>
      )}
      {props.text && <Text color="gray.300">{props.text}</Text>}
      {props.videoUrl && (
        <Video
          style={styles.video}
          ref={video}
          source={{
            uri: props.videoUrl,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping={false}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          // accessible={!isVideoRunning || isVideoRunning == name}
        />
      )}
      <PostButtons upvotes={props.upvotes} downvotes={props.downvotes} />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "red",
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: 220,
    // borderWidth: 2,
    // borderColor: "white",
  },
});

export default Post;
