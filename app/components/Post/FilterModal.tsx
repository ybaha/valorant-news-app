import {
  View,
  Text,
  Box,
  Image,
  ScrollView,
  Pressable,
  Button,
} from "native-base";
import React from "react";
import { Modalize } from "react-native-modalize";
import { useMainStore } from "../../store/main";
import BadgeBox from "../BadgeBox";

const Modal = React.forwardRef((props, ref) => {
  const { setTriggerFetch, filters, setFilters } = useMainStore();
  return (
    <Modalize
      modalHeight={600}
      modalStyle={{ backgroundColor: "#121212" }}
      ref={ref as any}
    >
      <View p={4}>
        {/* Maps */}
        <ColoredBox color1="darkBlue.700" color2="light.900" title="Maps">
          <ScrollView horizontal bounces>
            {Object.keys(MapImageUris).map((e) => (
              <Map name={e} key={e}></Map>
            ))}
          </ScrollView>
        </ColoredBox>

        {/* Tags */}
        <ColoredBox color1="rose.900" color2="light.900" title="Tags">
          <BadgeBox
            selectable
            badgeTexts={["Bug", "Educational", "News", "Gameplay", "Meta"]}
          ></BadgeBox>
        </ColoredBox>

        <View
          mt={4}
          // backgroundColor="red.800"
          opacity={!!filters.length ? 1 : 0}
          flexDirection="row"
          justifyContent="space-between"
        >
          <Text color="white" maxWidth="85%">
            Selected Filters: {filters.join(", ")}
          </Text>
          <Text
            color="white"
            underline
            onPress={() => {
              setFilters([]);
            }}
          >
            Clear All
          </Text>
        </View>

        <Button
          // mt={272}
          mt={4}
          w={32}
          // variant="outline"
          // colorScheme="red"
          borderColor="red.600"
          onPress={() => {
            setTriggerFetch(true);
          }}
        >
          Apply Filters
        </Button>
      </View>
    </Modalize>
  );
});

type ColoredBoxProps = {
  color1: string;
  color2: string;
  title: string;
};

const ColoredBox: React.FC<ColoredBoxProps> = (p) => {
  const colors = [p.color1, p.color2];

  return (
    <Box
      mt={4}
      bg={{
        linearGradient: {
          colors: colors,
          start: [0, 0],
          end: [1, 0],
        },
      }}
      px={4}
      py={3}
      borderRadius={"xl"}
    >
      {p.title && (
        <Text color="gray.300" fontSize={18} pb={2}>
          {p.title}
        </Text>
      )}
      {p.children}
    </Box>
  );
};

const MapImageUris = {
  Haven: require("../../assets/haven.png"),
  Fracture: require("../../assets/fracture.png"),
  Icebox: require("../../assets/icebox.png"),
  Ascent: require("../../assets/ascent.png"),
  Split: require("../../assets/split.png"),
  Bind: require("../../assets/bind.png"),
};

export const maps = Object.keys(MapImageUris);

const Map: React.FC<{ name: string }> = ({ name }) => {
  const { filters, toggleFilters } = useMainStore();
  const isFiltersSelected = filters.includes(name);

  const width = "104px";

  return (
    <Pressable onPress={() => toggleFilters(name)}>
      <Box
        width={width}
        justifyContent="center"
        alignItems={"center"}
        borderRadius={12}
        mr={3}
      >
        <Box
          bg="rgba(0,0,0,0.25)"
          position={"absolute"}
          width={width}
          height={16}
          zIndex={2}
          borderRadius={12}
          borderColor={"white"}
          borderWidth={isFiltersSelected ? 2 : 0}
        ></Box>
        <Image
          source={MapImageUris[name as keyof typeof MapImageUris]}
          resizeMode="cover"
          width={width}
          height={16}
          alt="Image"
          background={"yellow.900"}
          borderRadius={12}
        ></Image>
        <Text
          color="white"
          fontSize={16}
          fontWeight="bold"
          position="absolute"
          bottom={4}
          zIndex={3}
        >
          {name.toLocaleUpperCase()}
        </Text>
      </Box>
    </Pressable>
  );
};

export default Modal;
