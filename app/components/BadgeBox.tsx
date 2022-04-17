import React from "react";
import { Text, Box, ScrollView, Pressable, View } from "native-base";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { maps } from "../utils/filter-constants";
import { tagsColors as colors } from "../utils/filter-constants";

type BadgeBoxProps = {
  badgeTexts: string | string[];
  selectable?: boolean;
  maxWidth?: string;
  filters?: string[];
  setFilters?: (e: string[]) => void;
  isBottomSheet?: boolean;
  doubleLayer?: boolean;
};

const BadgeBox: React.FC<BadgeBoxProps> = (p) => {
  if (typeof p.badgeTexts == "string") p.badgeTexts = [p.badgeTexts];
  const { filters, setFilters } = p;

  const toggleFilters = (filter: string) => {
    if (!filters || !setFilters) return;

    filters.includes(filter)
      ? setFilters(filters.filter((i) => i !== filter))
      : setFilters([...filters, filter]);
  };

  const getColor = (title: string) => {
    let color = "amber";

    if (Object.keys(colors).includes(title))
      color = colors[title as keyof typeof colors];

    if (maps.includes(title)) return [`darkBlue.700`, `green.800`];

    return [`${color}.700`, `${color}.800`];
  };

  const CustomView = p.isBottomSheet ? BottomSheetScrollView : ScrollView;

  let layer1: string[] = [],
    layer2: string[] = [];

  if (p.doubleLayer) {
    layer1 = p.badgeTexts.slice(0, p.badgeTexts.length / 2);
    layer2 = p.badgeTexts.slice(p.badgeTexts.length / 2, p.badgeTexts.length);
  }

  return (
    <CustomView
      horizontal={true}
      bounces
      alwaysBounceHorizontal
      maxWidth={p.maxWidth}
      borderRadius={12}
      overflow="hidden"
      showsHorizontalScrollIndicator={false}
      // background="red.500"
    >
      {p.doubleLayer
        ? layer2.map((text, i) => {
            let selected = false,
              l1selected = false,
              l2selected = false;
            if (p.doubleLayer) {
              l1selected = filters!.includes(layer1[i]);
              l2selected = filters!.includes(text);
            }
            if (p.selectable && filters!.includes(text)) selected = true;

            return (
              <View key={i}>
                <Pressable
                  // key={layer1[i]}
                  onPress={() => {
                    if (p.selectable) toggleFilters(layer1[i]);
                  }}
                >
                  <Box
                    style={{ alignSelf: "baseline" }}
                    flexShrink={0}
                    borderRadius={10}
                    px={2}
                    mr={2}
                    borderColor={l1selected ? "white" : "transparent"}
                    borderWidth={1}
                    bg={{
                      linearGradient: {
                        start: [0, 0],
                        end: [1, 0],
                        colors: getColor(layer1[i]),
                      },
                    }}
                  >
                    <Text color="white" style={{ alignSelf: "baseline" }}>
                      {layer1[i]}
                    </Text>
                  </Box>
                </Pressable>
                <Pressable
                  // key={text}
                  marginTop={2}
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
                    borderColor={l2selected ? "white" : "transparent"}
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
              </View>
            );
          })
        : p.badgeTexts.map((text, i) => {
            let selected = false;
            if (p.selectable && filters!.includes(text)) selected = true;

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
    </CustomView>
  );
};

export default BadgeBox;
