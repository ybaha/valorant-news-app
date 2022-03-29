import React from "react";
import { Text, Box, ScrollView, Pressable } from "native-base";
import { useMainStore } from "../store/main";
import { maps } from "./Post/FilterModal";

type BadgeBoxProps = {
  badgeTexts: string | string[];
  selectable?: boolean;
  maxWidth?: string;
};

const BadgeBox: React.FC<BadgeBoxProps> = (p) => {
  if (typeof p.badgeTexts == "string") p.badgeTexts = [p.badgeTexts];
  const { filters, toggleFilters } = useMainStore();

  const colors = {
    Educational: "green",
    News: "blue",
    Gameplay: "purple",
    Bug: "red",
    Meta: "teal",
  };

  const getColor = (title: string) => {
    let color = "amber";

    if (Object.keys(colors).includes(title))
      color = colors[title as keyof typeof colors];

    if (maps.includes(title)) return [`darkBlue.700`, `green.800`];

    return [`${color}.700`, `${color}.800`];
  };

  return (
    <ScrollView
      horizontal={true}
      bounces
      alwaysBounceHorizontal
      maxWidth={p.maxWidth}
      borderRadius={12}
      overflow="hidden"
      // background="red.500"
    >
      {p.badgeTexts.map((text, i) => {
        let selected = false;
        if (p.selectable && filters.includes(text)) selected = true;
        return (
          <Pressable
            key={i}
            onPress={() => {
              if (p.selectable) toggleFilters(text);
            }}
          >
            <Box
              style={{ alignSelf: "baseline" }}
              flexShrink={0}
              borderRadius={10}
              px={2}
              mr={2}
              borderColor={selected ? "white" : "transparent"}
              borderWidth={1}
              bg={{
                linearGradient: {
                  start: [0, 0],
                  end: [1, 0],
                  colors: getColor(text),
                },
              }}
            >
              <Text color="white" style={{ alignSelf: "baseline" }}>
                {text}
              </Text>
            </Box>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default BadgeBox;
