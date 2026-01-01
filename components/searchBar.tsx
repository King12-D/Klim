import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  onPress?: () => void;
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar = ({ onPress, placeholder, value, onChangeText }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-2">
      <Ionicons name="search" color={"#A78BFA"} size={20} />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5db"
        className="flex-1 text-white"
      />
    </View>
  );
};

export default SearchBar;
