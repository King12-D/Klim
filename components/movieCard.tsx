import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type MovieProps = {
  id: number | string;
  poster_path?: string | null;
  title: string;
  vote_average: number;
  release_date?: string;
};

const MovieCard: React.FC<MovieProps> = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://images.tmdb.org/t/p/w500${poster_path}`
              : "https://placeholder.co/500x400/1a1a1a/ffffff.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center justify-start gap-1">
          <Text className="text-xs text-gray-300 font-bold uppercase mt-1">
            ⭐ {Math.round(vote_average / 2)}
          </Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-xs text-gray-300 font-medium mt-1">
              {release_date?.split("-")[0]}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
