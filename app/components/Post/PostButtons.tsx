import { View, Text, Pressable, Button } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import ButtonGhost from "../ButtonGhost";

type PostButtonsProps = {
  upvotes: number | null;
  downvotes: number | null;
};

const PostButtons: React.FC<PostButtonsProps> = ({ upvotes, downvotes }) => {
  const [upPressed, setUpPressed] = React.useState(false);
  const [downPressed, setDownPressed] = React.useState(false);

  const getButtonColor = (pressed: boolean) => {
    // TODO: pressed || upvoted
    return pressed ? "red" : "white";
  };

  return (
    <View flexDir="row" justifyContent="space-between" mt={2} py={2}>
      <View flexDir="row">
        <Pressable
          flexDir="row"
          onPressIn={() => setUpPressed(true)}
          onPressOut={() => setUpPressed(false)}
        >
          <AntDesign
            name="upcircleo"
            size={24}
            color={getButtonColor(upPressed)}
          />
          <Text color="gray.400" ml={2} mr={6}>
            {upvotes}
          </Text>
        </Pressable>

        <Pressable
          flexDir="row"
          onPressIn={() => setDownPressed(true)}
          onPressOut={() => setDownPressed(false)}
        >
          <AntDesign
            name="downcircleo"
            size={24}
            color={getButtonColor(downPressed)}
          />
          <Text color="gray.400" ml={2} mr={6}>
            {downvotes}
          </Text>
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
        >
          Report
        </Button>
      </View>
    </View>
  );
};

export default PostButtons;
