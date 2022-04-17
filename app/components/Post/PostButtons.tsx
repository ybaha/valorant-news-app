import { View, Text, Pressable, Button } from "native-base";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React from "react";
import axios from "axios";
import usePostStore from "../../store/post";
import { Post as PostType } from "../../../server/node_modules/.prisma/client";

type PostButtonsProps = {
  upvotes: number | null;
  downvotes: number | null;
  postId: string;
  postData: PostType;
};

const PostButtons: React.FC<PostButtonsProps> = ({
  upvotes,
  downvotes,
  postId,
  postData,
}) => {
  const [foo, setfoo] = React.useState(false);
  const { interactedPosts, setInteractedPosts, togglePostBookmark } =
    usePostStore();

  const interactedPost = interactedPosts.find((p) => p.postId === postId);

  const isReported = !!interactedPost?.reported;
  const isUpvoted = !!interactedPost?.upvoted;
  const isDownvoted = !!interactedPost?.downvoted;
  const isBookmarked = !!interactedPost?.bookmarked;

  const [upPressed, setUpPressed] = React.useState(isUpvoted);
  const [downPressed, setDownPressed] = React.useState(isDownvoted);
  const [bookmarked, setBookmarked] = React.useState(isBookmarked);
  const [votes, setVotes] = React.useState({
    upvotes: upvotes,
    downvotes: downvotes,
  });

  const getButtonColor = (pressed: boolean, voted: boolean) => {
    // TODO: pressed || upvoted
    return pressed || voted ? "red" : "white";
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    togglePostBookmark(postData);
    setInteractedPosts({
      postId,
      reported: isReported,
      upvoted: isUpvoted,
      downvoted: isDownvoted,
      bookmarked: !bookmarked,
    });
  };

  const handleReport = async () => {
    let res;
    try {
      res = await axios.post("http://192.168.0.18:3002/post/report", {
        postId,
        isUndo: isReported,
      });
    } catch (e) {
      console.log(e);
    }
    if (typeof res?.data.reportCount !== "undefined")
      setInteractedPosts({
        postId,
        reported: !isReported,
        upvoted: isUpvoted,
        downvoted: isDownvoted,
        bookmarked,
      });
  };

  const handleVote = async ({ isUpvote }: { isUpvote: boolean }) => {
    const req = {
      postId,
      shouldUndoDownvoteFirst: false,
      shouldUndoUpvoteFirst: false,
      upvote: false,
      downvote: false,
    };

    if (isUpvote) {
      let upvoted = true;
      if (isDownvoted) req.shouldUndoDownvoteFirst = true;
      if (isUpvoted) {
        req.shouldUndoUpvoteFirst = true;
        upvoted = false;
      }
      req.upvote = true;
      setInteractedPosts({
        postId,
        upvoted,
        downvoted: false,
        reported: isReported,
        bookmarked,
      });
    }
    if (!isUpvote) {
      let downvoted = true;
      if (isUpvoted) req.shouldUndoUpvoteFirst = true;
      if (isDownvoted) {
        req.shouldUndoDownvoteFirst = true;
        downvoted = false;
      }

      req.downvote = true;
      setInteractedPosts({
        postId,
        downvoted,
        upvoted: false,
        reported: isReported,
        bookmarked,
      });
    }
    const res = await axios.post("http://192.168.0.18:3002/post/vote", req);
    setVotes({ upvotes: res.data.upvotes, downvotes: res.data.downvotes });
  };

  React.useEffect(() => {
    setfoo(!foo);
  }, [interactedPosts]);

  return (
    <View flexDir="row" justifyContent="space-between" mt={2} py={2}>
      <View flexDir="row">
        <Pressable
          flexDir="row"
          onPressIn={() => setUpPressed(true)}
          onPressOut={() => {
            setUpPressed(false);
            handleVote({ isUpvote: true });
          }}
        >
          <AntDesign
            name="upcircleo"
            size={24}
            color={getButtonColor(upPressed, isUpvoted)}
          />
          <Text color="gray.400" ml={2} mr={6}>
            {votes.upvotes}
          </Text>
        </Pressable>

        <Pressable
          flexDir="row"
          onPressIn={() => setDownPressed(true)}
          onPressOut={() => {
            setDownPressed(false);
            handleVote({ isUpvote: false });
          }}
        >
          <AntDesign
            name="downcircleo"
            size={24}
            color={getButtonColor(downPressed, isDownvoted)}
          />
          <Text color="gray.400" ml={2} mr={6}>
            {votes.downvotes}
          </Text>
        </Pressable>

        <Pressable flexDir="row" ml={2} onPress={handleBookmark}>
          <FontAwesome
            name={bookmarked ? "bookmark" : "bookmark-o"}
            size={24}
            color={bookmarked ? "white" : "gray"}
            // color={"white"}
          />
        </Pressable>
      </View>

      <View>
        <Button
          size="sm"
          variant="outline"
          color="red.600"
          colorScheme="red"
          borderColor="red.600"
          py={0.5}
          onPress={() => handleReport()}
        >
          {isReported ? "Undo Report" : "Report"}
        </Button>
      </View>
    </View>
  );
};

export default PostButtons;
