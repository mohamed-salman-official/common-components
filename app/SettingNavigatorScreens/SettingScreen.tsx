import { fetchUserData } from "@/Helper/APIServices";
import {
  getCurrentLocation,
  handleNoNetwork,
  isNetworkAvailable,
} from "@/Helper/PermissionManager";
import { PostData } from "@/Model/PostModel";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, SafeAreaView, Button } from "react-native";

export default function SettingsScreen() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isNetworkChecked, setIsNetworkChecked] = useState(false);

  const init = async () => {
    console.log("Checking network...");
    const networkAvailable = await isNetworkAvailable();
    console.log("Network status:", networkAvailable);

    if (!networkAvailable) {
      handleNoNetwork();
      setIsNetworkChecked(true);
      return;
    }

    const location = await getCurrentLocation();
    console.log("Location fetched:", location);

    try {
      const data = await fetchUserData("");
      console.log("Data fetched:", data);
      if (data) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    init(); // Initial network and data load
  }, []);

  const handleRetry = async () => {
    setIsNetworkChecked(false); // Reset the state for retry logic
    await init(); // Retry the initialization (network check + data fetch)
  };

  return (
    <SafeAreaView>
      {isNetworkChecked && (
        <View style={{ padding: 20 }}>
          <Text>No network available.</Text>
          <Button title="Retry" onPress={handleRetry} />
        </View>
      )}

      {!isNetworkChecked && (
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
      )}
    </SafeAreaView>
  );
}
