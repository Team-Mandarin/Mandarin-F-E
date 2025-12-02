import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import Button from "../ui/Button";
import Input from "../ui/Input";
import MandarinText from "../ui/MandarinText";

export default function NameEditPage() {
  const userNames = "만다린";
  const [userName, setUserName] = useState("만다린");

  return (
    <View className="flex-1 justify-between">
      <View>
        <MandarinText className="text-[12px] ml-8 mt-2 mb-16">
          {userNames}님이 설정한 이름을 수정해요
        </MandarinText>
        <MandarinText className="text-[23px] font-bold ml-8 mt-2">
          이름
        </MandarinText>
        <View className="mx-auto mt-4">
          <Input
            value={userName}
            onChangeText={(text) => {
              setUserName(text);
            }}
          />
        </View>
      </View>
      <View className="items-center pb-4 w-[320px] mx-auto">
        <Button label="저장하기" onPress={() => router.back()} />
      </View>
    </View>
  );
}
