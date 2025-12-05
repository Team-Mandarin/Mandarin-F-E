import { authService } from "@/services/authService";
import { router } from "expo-router";
import { useState } from "react";
import { Keyboard, View } from "react-native";
import Toast from "react-native-toast-message";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function CheckPWPage() {
  const [inputPW, setInputPW] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const next = async () => {
    Keyboard.dismiss();

    if (!inputPW.trim()) {
      Toast.show({
        type: "login",
        visibilityTime: 4000,
        position: "bottom",
        text1: "비밀번호를 입력해주세요.",
      });
      return;
    }

    setIsLoading(true);

    try {
      // 저장된 userId 가져오기
      const userId = await authService.getUserId();

      if (!userId) {
        Toast.show({
          type: "login",
          visibilityTime: 4000,
          position: "bottom",
          text1: "로그인 정보를 찾을 수 없습니다.",
        });
        return;
      }

      // 로그인 API를 활용하여 비밀번호 확인
      const response = await authService.login({
        userId: userId,
        password: inputPW,
      });

      if (response.success) {
        // 비밀번호 일치 → 회원정보 관리 페이지로 이동
        router.push("/profileedit");
      } else {
        Toast.show({
          type: "login",
          visibilityTime: 4000,
          position: "bottom",
          text1: response.message || "비밀번호가 일치하지 않습니다.",
        });
      }
    } catch (error: any) {
      console.error("비밀번호 확인 실패:", error);
      Toast.show({
        type: "login",
        visibilityTime: 4000,
        position: "bottom",
        text1: error.response?.data?.message || "비밀번호가 일치하지 않습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-between items-center">
      <Input
        value={inputPW}
        onChangeText={setInputPW}
        placeholder="비밀번호"
        containerClassName="w-96 mt-20"
        secureTextEntry={true}
        editable={!isLoading}
      />
      <Button
        label={isLoading ? "확인 중..." : "계속하기"}
        onPress={next}
        className="w-96 mb-4"
        disabled={isLoading}
        isLoading={isLoading}
      />
    </View>
  );
}
