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
    const [mainFilters, setMainFilters] = React.useState([] as string[]);

    const fetch = async () => {
      let res,
        searchParams = mainFilters.join(","),
        url = "http://10.0.2.2:3002/post";

      try {
        setLoading(true);
        if (mainFilters) url += `?tags=${searchParams}`;
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
    }, [mainFilters]);

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
                (!posts.length && (
                  <View>
                    <Text color={"gray.300"}>
                      No such post.{" "}
                      {!!mainFilters.length && (
                        <Text
                          color="gray.200"
                          underline
                          onPress={() => setMainFilters([])}
                        >
                          Clear filters
                        </Text>
                      )}
                    </Text>
                  </View>
                ))}
            </View>
          )}
        </ScrollView>
        <Modal
          mainFilters={mainFilters}
          setMainFilters={setMainFilters}
          modalOpen={props.modalOpen}
          setModalOpen={props.setModalOpen}
          ref={ref}
        />
      </ScreenLayout>
    );
  }
);

export default React.memo(Main);
