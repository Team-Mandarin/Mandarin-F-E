import { Image, Pressable, View } from "react-native";
import MandarinText from "../ui/MandarinText";

export default function CharacterCard() {
  const characters = [
    {
      id: 4,
      name: "캐릭터4",
      image: require("@/assets/images/character/4.jpeg"),
      lovetype: 3,
      keyword: "친절한 말투2",
      percentage: 70,
      missions: ["캐릭터4 미션1", "캐릭터4 미션2", "캐릭터4 미션3"],
    },
  ];

  return (
    <View className="flex-row w-full justify-between px-12 items-center">
      <View className="flex-row items-center gap-4">
        <Image
          source={characters[0].image}
          className="w-12 h-12 rounded-full"
        />
        <MandarinText className="text-xl font-semibold">
          {characters[0].name}
        </MandarinText>
      </View>
      <Pressable>
        <View className="bg-[#F2F2F2] rounded-2xl px-6 py-2">
          <MandarinText className="text-xl font-semibold">변경</MandarinText>
        </View>
      </Pressable>
    </View>
  );
}
