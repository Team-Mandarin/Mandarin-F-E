import SignUpPage from "@/components/auth/signuppage";
import Header from "@/components/ui/Header";
import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView className="flex-1 bg-white">
      <Header
        title="회원가입"
        onBack={handleBack}
        showBackButton={step !== 4}
      />
      <SignUpPage step={step} setStep={setStep} />
    </SafeAreaView>
  );
}
