import SignUpPage from "@/components/auth/signuppage";
import Header from "@/components/ui/Header";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function AuthSignUp() {
  const [step, setStep] = useState(1);

  const handleBack = () => {
    if (step === 1) {
      router.back();
    } else {
      setStep(step - 1);
    }
  };

  return (
    <View className="flex-1 bg-white w-full">
      <Header title="회원가입" onBack={handleBack} />
      <SignUpPage step={step} setStep={setStep} />
    </View>
  );
}
