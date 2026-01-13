import { authService } from "@/services/authService";
import { router } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Button from "../ui/Button";
import CheckBox from "../ui/CheckBox";
import Input from "../ui/Input";
import MandarinText from "../ui/MandarinText";

export default function LoginPage() {
  const [iD, setID] = useState("");
  const [password, setPassword] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const login = async () => {
    Keyboard.dismiss();
    setErrorMessage("");

    // 입력값 검증
    if (!iD.trim() || !password.trim()) {
      setErrorMessage("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      // 로그인 API 호출
      const response = await authService.login({
        userId: iD,
        password: password,
      });

      if (response.success) {
        // 자동 로그인 설정 저장
        await authService.setAutoLoginEnabled(autoLogin);

        // loveType에 따라 분기 처리
        // 0-15: 이미 테스트 완료 → 채팅 화면으로 이동
        // 16: 테스트 필요 → 연애타입 검사 화면으로 이동
        if (
          response.loveType !== undefined &&
          response.loveType >= 0 &&
          response.loveType <= 15
        ) {
          router.replace("/(tabs)/chat");
        } else {
          router.replace("/lovetype");
        }
      } else {
        // 로그인 실패 메시지 표시
        setErrorMessage(response.message || "로그인에 실패했습니다.");
      }
    } catch (error: any) {
      console.error("로그인 실패:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1">
      <KeyboardAvoidingView
        behavior={"padding"}
        className="flex-1 w-full"
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 w-full items-center justify-between pb-6">
            <View className="w-full items-center mt-20">
              <MandarinText className="text-black text-[27px] mb-10">
                회원 정보를 입력해주세요.
              </MandarinText>
              <Input
                value={iD}
                onChangeText={(text) => {
                  setID(text);
                }}
                placeholder="아이디"
                editable={!isLoading}
              />
              <Input
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                secureTextEntry={true}
                placeholder="패스워드"
                editable={!isLoading}
              />
              <View className="w-96 items-center">
                <CheckBox
                  label="자동 로그인"
                  checked={autoLogin}
                  onCheckedChange={(checked) => {
                    setAutoLogin(checked);
                  }}
                />
              </View>
              {errorMessage ? (
                <MandarinText className="text-red-500 text-[14px] mt-4 text-center px-8">
                  {errorMessage}
                </MandarinText>
              ) : null}
            </View>

            <View className="w-[350px] items-center">
              <Button
                label={isLoading ? "로그인 중..." : "로그인"}
                onPress={login}
                className="w-[325px]"
                disabled={isLoading}
                isLoading={isLoading}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}
