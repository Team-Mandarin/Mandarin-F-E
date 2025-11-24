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

interface NameInputProps {
  name: string;
  setName: (text: string) => void;
  setStep: (step: number) => void;
}

export default function NameInput({ name, setName, setStep }: NameInputProps) {
  const [err, setErr] = useState("");

  const next = () => {
    const regex = /^[가-힣]+$/;
    if (name.length < 1 || name.length > 5 || !regex.test(name)) {
      setErr("이름은 한글만을 포함해 1~5자로 입력해주세요.");
    } else {
      setStep(2);
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
            <MandarinText className="text-black text-[27px] mb-10">
              이름을 입력해주세요
            </MandarinText>

            <Input
              value={name}
              onChangeText={(text) => {
                setName(text);
                setErr("");
              }}
              errorMessage={err}
              placeholder="만다린"
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
