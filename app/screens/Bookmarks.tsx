import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "native-base";
import ScreenLayout from "../components/Layout";
import PingIcon from "../components/PingIcon";
import axios from "axios";
import usePostStore from "../store/post";
import Post from "../components/Post/Post";

const Bookmarks = () => {
  const [loading, setLoading] = useState(false);
  const { bookmarkedPosts } = usePostStore();
  // console.log({ bookmarkedPosts });

  return (
    <ScreenLayout px={0} py={0}>
      <ScrollView h="full">
        {loading ? (
          <View justifyContent="center" alignItems="center" mt={8}>
            <PingIcon />
          </View>
        ) : bookmarkedPosts && bookmarkedPosts.length ? (
          bookmarkedPosts.map((p, idx) => (
            <Post name={idx.toString()} key={p.header} data={p}></Post>
          ))
        ) : (
          <View justifyContent="center" alignItems="center" mt={8}>
            {!bookmarkedPosts.length && (
              <Text color={"gray.300"}>
                You don't have any bookmarked posts.
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </ScreenLayout>
  );
};

export default Bookmarks;
