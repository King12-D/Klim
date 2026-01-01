import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/searchBar";
import TopGlow from "@/components/topGlow";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { fetchMovies } from "../../services/api";
import useFetch from "../../services/useFetch";

export default function Home() {
  const router = useRouter();

  //Get the all the results from the useFetch api
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <TopGlow />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        {/* This is the i,age shown at the top of the search bar*/}
        <Image
          source={require("../../assets/images/icon.png")}
          className="w-36 h-28 mt-11 mb-2 mx-auto"
        />

        <View>
          {/* Moumth the seacrh bar component */}
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search for movies..."
          />
        </View>

        {/* Check if the movie is loading and set the loaging state */}
        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text className="text-white">Error: ${moviesError.message}</Text>
        ) : (
          <View className="flex-1 mt-2">
            <>
              <Text className="text-lg text-white mt-5 mb-3 font-bold">
                Latest movies
              </Text>

              {/* Display the movies using a flat list */}
              <FlatList
                className="mt-2 pb-32"
                data={movies}
                //Note render takes a property distructuring and returns it with an arrow function
                renderItem={({ item }) => <MovieCard {...item} />}
                //Keyextractor gives the item an id
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  padding: 5,
                  marginBottom: 10,
                }}
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
