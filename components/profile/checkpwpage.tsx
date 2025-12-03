import { router } from "expo-router";
import { useState } from "react";
import { Keyboard, View } from "react-native";
import Toast from "react-native-toast-message";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function CheckPWPage() {
  const password = "test";
  const [inputPW, setInputPW] = useState("");

  const next = () => {
    Keyboard.dismiss();
    if (inputPW === password) {
      router.push("/profileedit");
    } else {
      Toast.show({
        type: "login",
        visibilityTime: 4000,
        position: "bottom",
        text1: "비밀번호가 일치하지 않습니다.",
      });
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
      />
      <Button label="계속하기" onPress={next} className="w-96 mb-4" />
    </View>
  );
}
