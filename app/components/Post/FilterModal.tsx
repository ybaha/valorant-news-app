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
import BadgeBox from "../BadgeBox";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import CustomBackdrop from "./FilterModalBackdrop";
import { agents, tags } from "../../utils/filter-constants";
import { Dimensions } from "react-native";

type ModalProps = {
  mainFilters: string[];
  setMainFilters: (s: string[]) => void;
  modalOpen: boolean;
  setModalOpen: (s: boolean) => void;
};

const Modal = React.forwardRef(
  (props: ModalProps, ref: React.ForwardedRef<BottomSheet>) => {
    const dimensions = React.useMemo(() => Dimensions.get("window"), []);
    // bottom sheet height = 510 + 100
    const snapPoint = ((610 / dimensions.height) * 100).toFixed(0) + "%";
    const snapPoints = React.useMemo(() => [snapPoint], []);

    const { mainFilters, setMainFilters, modalOpen, setModalOpen } = props;

    const [filters, setFilters] = React.useState<string[]>([]);

    return (
      <BottomSheet
        ref={ref as any}
        snapPoints={snapPoints}
        index={-1}
        enableContentPanningGesture={false}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: "#121212",
          borderTopColor: "#363636",
          borderWidth: 1,
        }}
        handleIndicatorStyle={{ backgroundColor: "white" }}
        // TODO: breaks scrollview
        backdropComponent={(p) =>
          modalOpen ? (
            <CustomBackdrop
              animatedIndex={p.animatedIndex}
              animatedPosition={p.animatedPosition}
              style={p.style}
              modalRef={ref as any}
              setModalOpen={setModalOpen}
            />
          ) : null
        }
      >
        <View
          p={4}
          // onLayout={(event) => {
          //   var { x, y, width, height } = event.nativeEvent.layout;
          //   console.log(x, y, width, height);
          // }}
        >
          {/* Maps */}
          <ColoredBox
            color1="darkBlue.700"
            color2="light.900"
            title="Maps"
            minHeight={32}
          >
            <BottomSheetScrollView horizontal bounces>
              {Object.keys(MapImageUris).map((e) => (
                <Map
                  filters={filters}
                  setFilters={setFilters}
                  name={e}
                  key={e}
                ></Map>
              ))}
            </BottomSheetScrollView>
          </ColoredBox>

          {/* Agents */}
          <ColoredBox
            color1="rose.900"
            color2="light.900"
            title="Agents"
            minHeight={32}
          >
            <BadgeBox
              selectable
              filters={filters}
              setFilters={setFilters}
              badgeTexts={agents}
              isBottomSheet
              doubleLayer
            ></BadgeBox>
          </ColoredBox>

          {/* Tags */}
          <ColoredBox
            color1="green.900"
            color2="light.900"
            title="Tags"
            minHeight={24}
          >
            <BadgeBox
              selectable
              filters={filters}
              setFilters={setFilters}
              badgeTexts={tags}
              isBottomSheet
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
                setMainFilters([]);
              }}
            >
              Clear All
            </Text>
          </View>

          <Button
            w={32}
            // variant="outline"
            colorScheme="red"
            borderColor="red.600"
            bg="red.800"
            onPress={() => {
              setMainFilters(filters);
              //@ts-ignore
              ref?.current.close();
              setModalOpen(false);
            }}
          >
            Apply Filters
          </Button>
        </View>
      </BottomSheet>
    );
  }
);

type ColoredBoxProps = {
  color1: string;
  color2: string;
  title: string;
  minHeight?: number;
};

const ColoredBox: React.FC<ColoredBoxProps> = (p) => {
  const colors = [p.color1, p.color2];

  return (
    <Box
      minHeight={p.minHeight || "auto"}
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
  Ascent: require("../../assets/ascent.png"),
  Bind: require("../../assets/bind.png"),
  Fracture: require("../../assets/fracture.png"),
  Haven: require("../../assets/haven.png"),
  Icebox: require("../../assets/icebox.png"),
  Split: require("../../assets/split.png"),
};

const toggleFilters = (
  filter: string,
  filters?: string[],
  setFilters?: (s: string[]) => void
) => {
  if (!filters || !filter || !setFilters) return;

  filters.includes(filter)
    ? setFilters(filters.filter((i) => i !== filter))
    : setFilters([...filters, filter]);
};

const Map: React.FC<{
  name: string;
  filters?: string[];
  setFilters?: (s: string[]) => void;
}> = ({ name, filters, setFilters }) => {
  const isFiltersSelected = filters?.includes(name);

  const width = "102px";

  return (
    <Pressable onPress={() => toggleFilters(name, filters, setFilters)}>
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
