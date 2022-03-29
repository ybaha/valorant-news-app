import { StyleSheet } from "react-native";
import { AVPlaybackStatus, Video } from "expo-av";
import React from "react";
import { Button, View, Text, Box, Row } from "native-base";
import Badges from "../BadgeBox";
import { AntDesign } from "@expo/vector-icons";
import PostButtons from "./PostButtons";
import { Post as PostType } from "../../../server/node_modules/.prisma/client";

type PostProps = {
  name: string;
  data: PostType;
};

const Post: React.FC<PostProps> = (props) => {
  const video = React.useRef<any>(null);
  const [status, setStatus] = React.useState({} as AVPlaybackStatus);

  const date = new Date(props.data.createdAt).toLocaleDateString();

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
      <View flexDirection="row" justifyContent="space-between">
        <Badges badgeTexts={props.data.tags} maxWidth="80%" />
        <Text color="gray.300">{date.toString()}</Text>
      </View>
      {props.data.header && (
        <Text color="gray.100" fontSize={22}>
          {props.data.header}
        </Text>
      )}
      {props.data.text && (
        <Text color="gray.300" maxHeight={320} overflow={"hidden"}>
          {props.data.text}
        </Text>
      )}
      {props.data.videoUrl && (
        <Video
          style={styles.video}
          ref={video}
          source={{
            uri: props.data.videoUrl,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping={false}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          // accessible={!isVideoRunning || isVideoRunning == name}
        />
      )}
      <PostButtons
        upvotes={props.data.upvotes}
        downvotes={props.data.downvotes}
        postId={props.data.id}
      />
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
