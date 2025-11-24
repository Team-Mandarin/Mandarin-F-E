import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Button from "../ui/Button";
import Input from "../ui/Input";
import MandarinText from "../ui/MandarinText";

interface PWInputProps {
  password: string;
  setPassword: (text: string) => void;
  setStep: (step: number) => void;
}

export default function PWInput({
  password,
  setPassword,
  setStep,
}: PWInputProps) {
  const [tempPassword, setTempPassword] = useState("");
  const [err, setErr] = useState("");

  const next = () => {
    if (password != tempPassword) {
      setErr("비밀번호가 일치하지 않습니다.");
    } else {
      setStep(4);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      className="flex-1 w-full"
      keyboardVerticalOffset={90}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 w-full items-center justify-between pb-6">
          <View className="w-full items-center mt-20">
            <MandarinText className="text-black text-[27px]">
              사용할 패스워드를
            </MandarinText>
            <MandarinText className="text-black text-[27px] mb-10">
              입력해주세요
            </MandarinText>
            <Input
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
              secureTextEntry={true}
              placeholder="패스워드"
            />
            <Input
              value={tempPassword}
              onChangeText={(text) => {
                setTempPassword(text);
                setErr("");
              }}
              errorMessage={err}
              secureTextEntry={true}
              placeholder="패스워드 확인"
            />
          </View>

          <View className="w-[325px] items-center">
            <Button label="계속하기" onPress={next} className="w-[325px]" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
