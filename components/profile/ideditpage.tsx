import { authService } from "@/services/authService";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Button from "../ui/Button";
import Input from "../ui/Input";
import MandarinText from "../ui/MandarinText";

export default function IdEditPage() {
  const [userID, setUserID] = useState("");
  const [newID, setNewID] = useState("");
  const [isDuplicated, setIsDuplicated] = useState(false);

  // 현재 로그인한 사용자의 아이디 가져오기
  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await authService.getUserId();
      if (userId) {
        setUserID(userId);
      }
    };
    fetchUserId();
  }, []);

  // 중복확인 로직 및 저장 로직 추가
  const checkDuplicate = () => {
    setIsDuplicated(true);
  };

  const saveID = () => {
    router.back();
  };

  return (
    <View className="flex-1 justify-between pb-4 w-full">
      <View className="flex-1 ml-8 mt-4">
        <MandarinText className="text-sm">
          {userID}님의 아이디를 변경해주세요
        </MandarinText>
        <MandarinText className="text-3xl font-semibold mt-10">
          현재 사용중인 아이디
        </MandarinText>
        <View className="bg-gray-100 p-4 rounded-lg mt-2 w-96">
          <MandarinText className="text-lg">{userID}</MandarinText>
        </View>
        <MandarinText className="text-3xl font-semibold mt-8 mb-2">
          변경하고 싶은 아이디
        </MandarinText>
        <View className="flex-row items-start justify-between w-96">
          <Input
            value={newID}
            onChangeText={setNewID}
            placeholder="변경하고 싶은 아이디"
            className="text-lg"
            containerClassName="w-64 mb-0"
          />
          <Button
            label="중복확인"
            onPress={checkDuplicate}
            className="w-24 h-[56px]"
            textClassName="text-sm text-white font-medium"
          />
        </View>
        {isDuplicated && (
          <MandarinText className="text-red-500 text-sm mt-4">
            누군가 사용하고 있는 아이디예요.
          </MandarinText>
        )}
      </View>
      <Button label="저장하기" onPress={saveID} className="w-96 mx-auto" />
    </View>
  );
}
