import { ScrollView, Text, View } from "native-base";
import React from "react";
import ScreenLayout from "../components/Layout";
import Modal from "../components/Post/FilterModal";
import Post from "../components/Post/Post";
import { Post as PostType } from "../../server/node_modules/.prisma/client";
import axios from "axios";
import PingIcon from "../components/PingIcon";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

const Main = React.forwardRef(
  (props: any, ref: React.ForwardedRef<BottomSheetMethods>) => {
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [posts, setPosts] = React.useState<PostType[]>([]);
    const [filters, setFilters] = React.useState([] as string[]);

    // console.log("main component rendered");

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
      }
    };

    React.useEffect(() => {
      fetch();
    }, [filters]);

    return (
      <ScreenLayout px={0} py={0}>
        <ScrollView h="full">
          {loading ? (
            <View justifyContent="center" alignItems="center" mt={8}>
              <PingIcon></PingIcon>
            </View>
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
        <Modal
          mainFilters={filters}
          setMainFilters={setFilters}
          modalOpen={props.modalOpen}
          setModalOpen={props.setModalOpen}
          ref={ref}
        />
      </ScreenLayout>
    );
  }
);

export default React.memo(Main);
