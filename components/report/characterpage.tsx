import { SERVER_URL } from "@/lib/api";
import { authService } from "@/services/authService";
import { chatService } from "@/services/chatService";
import { Character } from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
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

export default function CharacterPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      const id = await authService.getId();
      const response = await chatService.getCharacters(Number(id));
      setCharacters(response.data);
      setIsLoading(false);
    };

    fetchCharacters();
  }, []);

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
      {isLoading ? (
        <ActivityIndicator />
      ) : characters.length > 0 ? (
        <>
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
            keyExtractor={(item) => item.characterId.toString()}
            renderItem={({ item }) => {
              const itemImageUrl = item.characterImg
                ? `${SERVER_URL}/uploads/${item.characterImg}`
                : null;
              return (
                <View
                  className="rounded-2xl overflow-hidden bg-white h-24 mt-4 flex-row justify-between items-center px-4"
                  style={{ width: CARD_WIDTH - 16, marginHorizontal: 8 }}
                >
                  <View className="w-[60px] h-[60px] rounded-full overflow-hidden mr-4 bg-gray-200 items-center justify-center">
                    {itemImageUrl ? (
                      <Image
                        source={{ uri: itemImageUrl }}
                        className="w-[60px] h-[60px]"
                        resizeMode="cover"
                      />
                    ) : (
                      <Ionicons name="person" size={30} color="#9CA3AF" />
                    )}
                  </View>
                  <MandarinText className="text-black text-xl font-bold">
                    {item.characterName}
                  </MandarinText>
                </View>
              );
            }}
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

          {currentCharacter && (
            <CharacterInfo currentCharacter={currentCharacter} />
          )}
        </>
      ) : (
        <MandarinText>캐릭터가 없습니다.</MandarinText>
      )}
    </ScrollView>
  );
}
