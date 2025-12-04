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
      className="flex-row items-center gap-4"
    >
      <View
        className={`w-6 h-6 border-2 rounded-md items-center justify-center ${
          checked ? "border-[#89CB26]" : "border-[#374957]"
        }`}
      >
        {!checked && (
          <Ionicons name="checkmark-sharp" size={18} color="#374957" />
        )}
        {checked && (
          <Ionicons name="checkmark-sharp" size={18} color="#89CB26" />
        )}
      </View>
      <MandarinText className={`flex-1 ${labelClassName || ""}`}>
        {label}
      </MandarinText>
    </Pressable>
  );
}
