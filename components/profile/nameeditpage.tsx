import { authService } from "@/services/authService";
import { userService } from "@/services/userService";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Button from "../ui/Button";
import Input from "../ui/Input";
import MandarinText from "../ui/MandarinText";

export default function NameEditPage() {
  const [userName, setUserName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [id, setId] = useState(0);
  const [sameUserName, setSameUserName] = useState(false);

  useEffect(() => {
    const getUserName = async () => {
      const id = Number(await authService.getId());
      setId(id);

      const userInfo = await userService.getUser(id);
      setUserName(userInfo.data.username);
      setNewUserName(userInfo.data.username);
    };
    getUserName();
  }, []);

  const saveName = async () => {
    if (userName === newUserName) {
      setSameUserName(true);
      return;
    }
    const response = await authService.changeInfo(id, undefined, newUserName);
    if (response.success) {
      router.replace("/profile");
    }
  };

  return (
    <View className="flex-1 justify-between">
      <View>
        <MandarinText className="text-[12px] ml-8 mt-2 mb-16">
          {userName}님이 설정한 이름을 수정해요
        </MandarinText>
        <MandarinText className="text-[23px] font-bold ml-8 mt-2">
          이름
        </MandarinText>
        <View className="mx-auto mt-4">
          <Input
            value={newUserName}
            onChangeText={(text) => {
              setNewUserName(text);
            }}
          />
        </View>
        {sameUserName && (
          <MandarinText className="text-red-500 text-sm ml-8">
            이전과 동일한 이름입니다.
          </MandarinText>
        )}
      </View>
      <View className="items-center pb-4 w-[320px] mx-auto">
        <Button label="저장하기" onPress={saveName} />
      </View>
    </View>
  );
}
