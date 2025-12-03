import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import MandarinText from "./MandarinText";

interface CheckBoxProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  labelClassName?: string;
}

export default function CheckBox({
  label,
  checked,
  onCheckedChange,
  labelClassName,
}: CheckBoxProps) {
  return (
    <Pressable
      onPress={() => onCheckedChange(!checked)}
      className="flex-row items-start gap-2"
    >
      <View
        className={`w-6 h-6 border-2 rounded-md items-center justify-center ${
          checked ? "bg-[#FF9D00] border-[#FF9D00]" : "border-black"
        }`}
      >
        {checked && <Ionicons name="checkmark" size={18} color="white" />}
      </View>
      <MandarinText className={`flex-1 ${labelClassName || ""}`}>{label}</MandarinText>
    </Pressable>
  );
}
