import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from "react-native";
import MandarinText from "../ui/MandarinText";
import CharacterInfo from "./characterinfo";

const { width: screenWidth } = Dimensions.get("window");
const CARD_WIDTH = screenWidth * 0.9;
const CARD_MARGIN = (screenWidth - CARD_WIDTH) / 2;

export default function Character() {
  const characters = [
    {
      id: 1,
      name: "캐릭터1",
      image: require("@/assets/images/character/1.jpeg"),
      lovetype: "0000",
      keyword: "탓하기",
      percentage: 70,
      missions: ["캐릭터1 미션1", "캐릭터1 미션2", "캐릭터1 미션3"],
    },
    {
      id: 2,
      name: "캐릭터2",
      image: require("@/assets/images/character/2.jpeg"),
      lovetype: "0001",
      keyword: "따듯한 말투",
      percentage: 70,
      missions: ["캐릭터2 미션1", "캐릭터2 미션2", "캐릭터2 미션3"],
    },
    {
      id: 3,
      name: "캐릭터3",
      image: require("@/assets/images/character/3.jpeg"),
      lovetype: "0010",
      keyword: "친절한 말투",
      percentage: 70,
      missions: ["캐릭터3 미션1", "캐릭터3 미션2", "캐릭터3 미션3"],
    },
    {
      id: 4,
      name: "캐릭터4",
      image: require("@/assets/images/character/4.jpeg"),
      lovetype: "0100",
      keyword: "친절한 말투2",
      percentage: 70,
      missions: ["캐릭터4 미션1", "캐릭터4 미션2", "캐릭터4 미션3"],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / CARD_WIDTH);
    if (index !== currentIndex && index >= 0 && index < characters.length) {
      setCurrentIndex(index);
    }
  };

  const currentCharacter = characters[currentIndex];

  return (
    <ScrollView className="flex-1">
      <FlatList
        ref={flatListRef}
        data={characters}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: CARD_MARGIN }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            className="rounded-2xl overflow-hidden bg-white h-24 mt-4 flex-row justify-between items-center px-4"
            style={{ width: CARD_WIDTH - 16, marginHorizontal: 8 }}
          >
            <Image
              source={item.image}
              className="w-20 h-20 rounded-full"
              resizeMode="cover"
            />
            <MandarinText className="text-black text-xl font-bold">
              {item.name}
            </MandarinText>
          </View>
        )}
      />

      <View className="flex-row justify-center mt-4 gap-2">
        {characters.map((_, index) => (
          <View
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-[#FF9D00]" : "bg-gray-300"
            }`}
          />
        ))}
      </View>

      <CharacterInfo currentCharacter={currentCharacter} />
    </ScrollView>
  );
}
