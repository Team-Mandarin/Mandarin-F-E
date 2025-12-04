import { router } from "expo-router";
import { ScrollView } from "react-native";
import MandarinText from "../ui/MandarinText";
import TriggerPointCard from "./triggerpointcard";

export default function TriggerPointPage({
  keyword,
  percentage,
}: {
  keyword: string;
  percentage: string;
}) {
  return (
    <ScrollView className="flex-1 ">
      <TriggerPointCard
        keyword={keyword}
        percentage={percentage}
        className="bg-[#E8EFFC]"
        onPress={() =>
          router.push({
            pathname: "/triggerdetail",
            params: {
              keyword: keyword,
            },
          })
        }
      />
      <TriggerPointCard
        keyword={keyword}
        percentage={percentage}
        className="bg-[#FFF8E3]"
        onPress={() =>
          router.push({
            pathname: "/triggerdetail",
            params: {
              keyword: keyword,
            },
          })
        }
      />
      <TriggerPointCard
        keyword={keyword}
        percentage={percentage}
        className="bg-[#E3F2CC]"
        onPress={() =>
          router.push({
            pathname: "/triggerdetail",
            params: {
              keyword: keyword,
            },
          })
        }
      />
      <MandarinText className="text-center text-xs font-light text-[#8E8E8E] mt-6 mb-4">
        해당 정보는 참고용이며 무조건적인 신뢰는 지양해주세요.
      </MandarinText>
    </ScrollView>
  );
}
