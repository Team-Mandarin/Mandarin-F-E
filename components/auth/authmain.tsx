import MandarinText from "@/components/ui/MandarinText";
import { router } from "expo-router";
import { View } from "react-native";
import Button from "../ui/Button";

export default function AuthMain() {
  return (
    <View className="bg-white h-screen justify-between pt-10 pb-40">
      <View className="left-10">
        <MandarinText className="text-[42px] font-bold">
          만다린을 {"\n"}이용하기 위해
        </MandarinText>
        <MandarinText>서비스 회원가입 또는 로그인을 진행해주세요.</MandarinText>
      </View>

      <View className="w-[276px] left-0 right-0 px-6 items-center gap-6 items-center mx-auto">
        <Button
          label="로그인하기"
          className="bg-[#FFE8C4]"
          textClassName="text-black"
          onPress={() => router.push("/login")}
        />
        <Button label="회원가입하기" onPress={() => router.push("/signup")} />
      </View>
    </View>
  );
}
