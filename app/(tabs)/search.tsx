import SearchBar from "@/components/searchBar";
import TopGlow from "@/components/topGlow";
import { logSearch } from "@/services/appwrite";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import MovieCard from "../../components/movieCard";
import { fetchMovies } from "../../services/api";
import useFetch from "../../services/useFetch";

interface Props {
  placeholder: string;
  onPress?: () => void;
  value: string;
  onChangeText: (text: string) => void;
}

const Search = ({ onPress, placeholder, value, onChangeText }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Get all the results from the useFetch api
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    reFetch: loadMovie,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), !!searchQuery.trim());

  const filteredMovies = movies?.filter(
    (movie: any) => movie.poster_path && movie.vote_average > 0
  );

  useEffect(() => {
    const timeId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovie();
        if (movies?.length > 0 && movies?.[0]) {
          await logSearch(searchQuery, movies[0]);
        }
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary px-5 py-2">
      <TopGlow />
      <FlatList
        data={filteredMovies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="p-2"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 18,
          marginBottom: 10,
          marginVertical: 20,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-30">
              <Image
                source={require("../../assets/images/icon.png")}
                className="w-36 h-28 mt-8 mb-1 mx-auto"
              />
            </View>
            <View className="mb-6">
              {/* Moumth the seacrh baer component */}
              <SearchBar
                placeholder="Search for movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {moviesLoading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {moviesError && (
              <Text className="text-rose-500 px-5 py 3 text-center">
                Error: {moviesError.message}
              </Text>
            )}

            {!moviesLoading &&
              !moviesError &&
              searchQuery.trim() &&
              movies?.length > 0 && (
                <Text className="text-xl text-center mt-1 text-white font-bold  mb-4">
                  Search result for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}

            {!moviesLoading &&
              !moviesError &&
              searchQuery.trim() &&
              movies?.length === 0 && (
                <Text className="text-center text-gray-400 mt-5">
                  No movies found
                </Text>
              )}
          </>
        }
      />
    </View>
  );
};

export default Search;
