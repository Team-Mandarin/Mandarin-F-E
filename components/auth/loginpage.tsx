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

  // 토스트 메시지 추가
  const login = () => {
    Keyboard.dismiss();
    router.replace("/chat");
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
              />
              <Input
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                secureTextEntry={true}
                placeholder="패스워드"
              />
              <View className="w-full items-start ml-16">
                <CheckBox
                  label="자동 로그인"
                  checked={autoLogin}
                  onCheckedChange={(checked) => {
                    setAutoLogin(checked);
                  }}
                />
              </View>
            </View>

            <View className="w-[350px] items-center">
              <Button label="로그인" onPress={login} className="w-[325px]" />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}
