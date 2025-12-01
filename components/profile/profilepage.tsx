import PencilIcon from "@/assets/svg/pencil.svg";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import MandarinText from "../ui/MandarinText";
import LoveTypeCard from "./lovetypecard";

export default function ProfilePage() {
  // 정보들은 추후 api를 통해 가져와서 입력
  const userName = "만다린";
  const userLoveType = 1000;

  return (
    <View className="flex-1 mt-0 ml-4">
      <View className="flex-row items-center">
        <MandarinText className="text-[25px] font-bold mr-2">
          {userName}님
        </MandarinText>
        <Pressable onPress={() => router.push("/profileedit")}>
          <PencilIcon />
        </Pressable>
      </View>
      <LoveTypeCard loveType={userLoveType} />
    </View>
  );
}
