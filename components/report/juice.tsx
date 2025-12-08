import Arrow from "@/assets/svg/arrow.svg";
import Juice0 from "@/assets/svg/juice/0.svg";
import Juice25 from "@/assets/svg/juice/25.svg";
import Juice50 from "@/assets/svg/juice/50.svg";
import Juice75 from "@/assets/svg/juice/75.svg";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import MandarinText from "../ui/MandarinText";

const JUICE_HEIGHT = 96;

export default function Juice() {
  const score = 77;
  const [juiceName, setJuiceName] = useState("");
  const [juiceImage, setJuiceImage] = useState<React.ReactNode>(
    <Juice75 height={JUICE_HEIGHT} />
  );

  useEffect(() => {
    if (score >= 75) {
      setJuiceName("감귤 착즙 주스");
      setJuiceImage(<Juice75 height={JUICE_HEIGHT} />);
    } else if (score >= 50) {
      setJuiceName("감귤맛 주스");
      setJuiceImage(<Juice50 height={JUICE_HEIGHT} />);
    } else if (score >= 25) {
      setJuiceName("감귤향 주스");
      setJuiceImage(<Juice25 height={JUICE_HEIGHT} />);
    } else {
      setJuiceName("감귤 껍질 주스");
      setJuiceImage(<Juice0 height={JUICE_HEIGHT} />);
    }
  }, [score]);
  return (
    <View className="bg-[white] w-96 rounded-2xl p-6 items-center justify-between">
      <Pressable className="gap-4" onPress={() => router.push("/juicedatail")}>
        <View className="flex-row items-center justify-between w-full">
          <MandarinText className="text-2xl font-semibold">
            나의 채팅
          </MandarinText>
          <Arrow />
        </View>
        <View className="items-center ">{juiceImage}</View>
        <MandarinText className="text-lg font-medium text-center">
          {juiceName}
        </MandarinText>
      </Pressable>
    </View>
  );
}
