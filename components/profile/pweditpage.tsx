import { router } from "expo-router";
import { useState } from "react";
import { Keyboard, View } from "react-native";
import Button from "../ui/Button";
import Input from "../ui/Input";
import MandarinText from "../ui/MandarinText";

export default function PwEditPage() {
  const userName = "만다린";
  const password = "test";
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lastPassword, setLastPassword] = useState(false);
  const [samePassword, setSamePassword] = useState(false);

  // 비밀번호 확인 로직 및 새로운 비밀번호 확인 로직 추가
  const savePW = () => {
    setLastPassword(false);
    setSamePassword(false);
    Keyboard.dismiss();
    if (password === newPassword) {
      setLastPassword(true);
      return;
    } else if (newPassword !== confirmPassword) {
      setSamePassword(true);
      return;
    } else {
      router.back();
    }
  };

  return (
    <View className="flex-1 justify-between">
      <View className="flex-1 ml-8 mt-4">
        <MandarinText className="text-sm">
          {userName}님의 패스워드를 변경해주세요
        </MandarinText>
        <MandarinText className="text-2xl font-semibold mt-10">
          새로운 패스워드
        </MandarinText>
        <Input
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="새로운 패스워드"
          secureTextEntry={true}
        />
        <MandarinText className="text-2xl font-semibold mt-4">
          새로운 패스워드 확인
        </MandarinText>
        <Input
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="새로운 패스워드 확인"
          secureTextEntry={true}
        />
        {lastPassword && (
          <MandarinText className="text-red-500 text-sm mt-4">
            이전 비밀번호와 동일합니다.
          </MandarinText>
        )}
        {samePassword && (
          <MandarinText className="text-red-500 text-sm mt-4">
            비밀번호가 일치하지 않습니다.
          </MandarinText>
        )}
      </View>

      <View className="items-center">
        <Button label="저장" onPress={savePW} className="w-96" />
      </View>
    </View>
  );
}
