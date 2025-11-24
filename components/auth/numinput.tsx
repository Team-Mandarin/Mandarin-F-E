import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Button from "../ui/Button";
import Input from "../ui/Input";
import MandarinText from "../ui/MandarinText";

interface NumInputProps {
  number: string;
  setNumber: (text: string) => void;
  setStep: (step: number) => void;
}

export default function NumInput({
  number,
  setNumber,
  setStep,
}: NumInputProps) {
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
              전화번호를
            </MandarinText>
            <MandarinText className="text-black text-[27px] mb-10">
              입력해주세요
            </MandarinText>

            <Input
              value={number}
              onChangeText={(text) => {
                setNumber(text);
              }}
              keyboardType="number-pad"
              maxLength={11}
              placeholder="01012345678"
            />
          </View>

          <View className="w-[325px] items-center">
            <Button
              label="계속하기"
              onPress={() => setStep(3)}
              className="w-[325px]"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
