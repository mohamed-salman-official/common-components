import { fetchUserData } from "@/Helper/APIServices";
import { PostData } from "@/Model/PostModel";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";

export default function SettingsScreen() {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUserData("");
        if (data) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    loadUser();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
