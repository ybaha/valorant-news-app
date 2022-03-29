import { Button, Fab, Pressable, ScrollView, Text, View } from "native-base";
import React from "react";
import { Modalize } from "react-native-modalize";
import ScreenLayout from "../components/Layout";
import Modal from "../components/Post/FilterModal";
import Post from "../components/Post/Post";
import { Feather } from "@expo/vector-icons";
import { Post as PostType } from "../../server/node_modules/.prisma/client";
import axios from "axios";
import { useMainStore } from "../store/main";
import PingIcon from "../components/PingIcon";
import usePostStore from "../store/post";

const Main = () => {
  const modalizeRef = React.useRef<Modalize>();
  const [posts, setPosts] = React.useState([] as PostType[]);
  const { filters, triggerFetch, setTriggerFetch, setLoading, loading } =
    useMainStore();
  const [error, setError] = React.useState(false);

  const fetch = async () => {
    let res,
      searchParams = filters.join(","),
      url = "http://192.168.0.18:3002/post";

    try {
      setLoading(true);
      if (filters) url += `?tags=${searchParams}`;
      res = await axios.get(url);
    } catch {
      console.log("error");
      setError(true);
    } finally {
      setPosts(res?.data.posts);
      setLoading(false);
      setTriggerFetch(false);
    }
  };

  React.useEffect(() => {
    if (!triggerFetch) return;
    modalizeRef.current?.close();
    fetch();
  }, [triggerFetch]);

  React.useEffect(() => {
    fetch();
  }, []);

  return (
    <ScreenLayout px={0} py={0}>
      <ScrollView h="full">
        <Fab
          style={{ width: 128, height: 56 }}
          label="Filter"
          top={0}
          right={-14}
          backgroundColor="black"
          onPress={() => modalizeRef.current?.open()}
          icon={<Feather name="filter" color="white" size={16}></Feather>}
        ></Fab>

        {/* <Fab
          top={0}
          onPress={() => modalizeRef.current?.open()}
          zIndex={2}
          bg="black"
          opacity={0.7}
          size={16}
          colorScheme="red"
          borderWidth={2}
          borderColor="red.800"
          icon={<Feather name="filter" size={28} color={"white"} />}
        ></Fab> */}

        {loading ? (
          loading && (
            <View justifyContent="center" alignItems="center" mt={8}>
              <PingIcon></PingIcon>
            </View>
          )
        ) : posts && posts.length ? (
          posts.map((p, idx) => (
            <Post name={idx.toString()} key={p.header} data={p}></Post>
          ))
        ) : (
          <View justifyContent="center" alignItems="center" mt={8}>
            {error && <Text color={"gray.300"}>Server Error</Text>}
            {!posts ||
              (!posts.length && <Text color={"gray.300"}>No such post</Text>)}
          </View>
        )}
      </ScrollView>
      <Modal ref={modalizeRef}></Modal>
    </ScreenLayout>
  );
};

export default Main;
