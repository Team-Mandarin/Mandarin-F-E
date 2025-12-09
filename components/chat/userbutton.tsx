import { Pressable, View } from "react-native";
import MandarinText from "../ui/MandarinText";

interface UserButtonProps {
  className?: string;
  label: string;
  onPress: () => void;
  selected?: boolean;
}

export default function UserButton({
  className,
  label,
  onPress,
  selected = false,
}: UserButtonProps) {
  return (
    <View className="flex-row justify-end mb-1">
      <Pressable onPress={onPress}>
        <View
          className={`px-4 py-3 rounded-2xl ${className} ${
            selected ? "bg-[#FF9D00]" : "bg-[#FFC300]"
          }`}
        >
          <MandarinText className="text-white text-sm text-center">
            {label}
          </MandarinText>
        </View>
      </Pressable>
    </View>
  );
}
