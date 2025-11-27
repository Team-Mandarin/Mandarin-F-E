import { router } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import Button from "../ui/Button";
import Input from "../ui/Input";
import MandarinText from "../ui/MandarinText";

export default function LoginPage() {
  const [iD, setID] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    Keyboard.dismiss();
    if (iD == "test" && password == "test") {
      // 나중에 if문 사용해서 러브타입 확인 후 페이지 이동(러브타입 설문 페이지 or 메인 페이지)
      router.replace("/lovetype");
    } else {
      Toast.show({
        type: "login",
        position: "bottom",
        text1: "회원 정보가 없거나",
        text2: "ID 혹은 PW가 잘못되었습니다",
        visibilityTime: 4000,
      });
    }
  };

  return (
    <SafeAreaView className="flex-1">
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
              />
              <Input
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                secureTextEntry={true}
                placeholder="패스워드"
              />
            </View>

            <View className="w-[350px] items-center">
              <Button label="로그인" onPress={login} className="w-[325px]" />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
