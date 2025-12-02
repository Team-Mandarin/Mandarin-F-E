import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import MandarinText from "./MandarinText";

interface CheckBoxProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export default function CheckBox({
  label,
  checked,
  onCheckedChange,
}: CheckBoxProps) {
  return (
    <Pressable
      onPress={() => onCheckedChange(!checked)}
      className="flex-row items-center gap-2"
    >
      <View
        className={`w-6 h-6 border-2 rounded-md items-center justify-center ${
          checked ? "bg-orange-500 border-orange-500" : "border-black"
        }`}
      >
        {checked && <Ionicons name="checkmark" size={18} color="white" />}
      </View>
      <MandarinText>{label}</MandarinText>
    </Pressable>
  );
}
