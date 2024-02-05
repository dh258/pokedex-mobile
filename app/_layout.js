import { Header } from "@rneui/themed";
import { Slot, router } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Header
          leftComponent={{
            icon: "home",
            color: "#fff",
            onPress: () => router.replace("/"),
          }}
          centerComponent={{
            text: "Pokedex Mobile",
            style: styles.heading,
          }}
        />
        <Slot />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
