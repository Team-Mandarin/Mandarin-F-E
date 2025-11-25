import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../ui/Button";
import MandarinText from "../ui/MandarinText";
import NumInput from "./idinput";
import NameInput from "./nameinput";
import PWInput from "./pwinput";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [iD, setID] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);

  return (
    <SafeAreaView className="flex-1">
      {step === 1 && (
        <NameInput name={name} setName={setName} setStep={setStep} />
      )}

      {step === 2 && <NumInput iD={iD} setID={setID} setStep={setStep} />}

      {step === 3 && (
        <PWInput
          password={password}
          setPassword={setPassword}
          setStep={setStep}
        />
      )}

      {step === 4 && (
        <View className="flex-1 justify-between">
          <View className="mt-10 px-8">
            <MandarinText className="text-[40px] font-bold">
              {name}님,
            </MandarinText>
            <MandarinText className="text-[40px] font-bold">
              회원가입이
            </MandarinText>
            <MandarinText className="text-[40px] font-bold">
              완료되었습니다!{"\n"}{" "}
            </MandarinText>
            <MandarinText className="text-[19px]">
              연애의 시작은{"\n"}나 자신을 알아가는 것부터{"\n"}
              시작해요!{"\n"}
            </MandarinText>
            <MandarinText className="text-[16px]">
              당신의 연애타입에 맞춰 16가지 만다린 친구들 중{"\n"}
              당신과 가장 어울리는{"\n"}
              만다린을 찾아드립니다.{"\n"}
            </MandarinText>
          </View>
          <View className="px-6 mb-10 w-full items-center">
            <Button label="일단 로그인 하기" />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
