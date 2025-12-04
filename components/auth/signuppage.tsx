import { authService } from "@/services/authService";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import Button from "../ui/Button";
import MandarinText from "../ui/MandarinText";
import NumInput from "./idinput";
import NameInput from "./nameinput";
import PWInput from "./pwinput";

interface SignUpPageProps {
  step: number;
  setStep: (step: number) => void;
}

export default function SignUpPage({ step, setStep }: SignUpPageProps) {
  const [name, setName] = useState("");
  const [iD, setID] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 회원가입 API 호출
  const handleRegister = async () => {
    setIsLoading(true);

    try {
      await authService.register({
        userId: iD,
        username: name,
        password: password,
      });

      // 성공 시 step 4로 이동 (완료 화면)
      setStep(4);
    } catch (error: any) {
      console.error("회원가입 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // PWInput에서 호출될 setStep을 래핑
  const handlePasswordComplete = (newStep: number) => {
    if (newStep === 4) {
      // step 4로 가기 전에 회원가입 API 호출
      handleRegister();
    } else {
      setStep(newStep);
    }
  };

  return (
    <View className="flex-1">
      {step === 1 && (
        <NameInput name={name} setName={setName} setStep={setStep} />
      )}

      {step === 2 && <NumInput iD={iD} setID={setID} setStep={setStep} />}

      {step === 3 && (
        <PWInput
          password={password}
          setPassword={setPassword}
          setStep={handlePasswordComplete}
        />
      )}

      {/* 로딩 중 화면 */}
      {isLoading && (
        <View className="flex-1 justify-center items-center">
          <MandarinText className="text-[20px] text-gray-600">
            회원가입 중...
          </MandarinText>
        </View>
      )}

      {step === 4 && !isLoading && (
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
            <Button
              label="일단 로그인 하기"
              onPress={() => router.replace("/login")}
            />
          </View>
        </View>
      )}
    </View>
  );
}
