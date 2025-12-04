import { ScrollView, View } from "react-native";
import MandarinText from "../ui/MandarinText";
import CheckBox from "../ui/ReportCheckBox";

export default function MissionCard({
  mission,
  className,
  checked,
  setChecked,
}: {
  mission: string;
  className?: string;
  checked: boolean;
  setChecked: (checked: boolean) => void;
}) {
  return (
    <View
      className={`w-80 h-80 py-8 px-8 mx-auto rounded-3xl mt-6 ${className}`}
    >
      <View className="flex-row justify-between">
        <MandarinText className="text-2xl font-bold mb-4">
          {mission}
        </MandarinText>
        <CheckBox
          label=""
          checked={checked}
          onCheckedChange={setChecked}
          labelClassName="text-base font-medium text-[#8E8E8E]"
        />
      </View>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <MandarinText className="text-sm font-medium">
          AI 분석 근거{"\n"}
          {"\n"}Lorem ipsum dolor sit amet consectetur. Tincidunt senectus velit
          suspendisse eleifend viverra arcu egestas molestie.{"\n"}
          {"\n"} Faucibus commodo maecenas viverra pellentesque tellus gravida.
          Felis diam in volutpat pharetra convallis.
        </MandarinText>
      </ScrollView>
    </View>
  );
}
