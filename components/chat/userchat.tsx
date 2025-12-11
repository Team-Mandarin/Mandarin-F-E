import { View } from "react-native";
import MandarinText from "../ui/MandarinText";

interface UserChatProps {
  className?: string;
  label: string;
}

export default function UserChat({ className, label }: UserChatProps) {
  return (
    <View className="flex-row justify-end mb-1">
      <View
        className={`px-4 py-3 rounded-tl-2xl max-w-64 rounded-bl-2xl rounded-br-2xl bg-[#FFC300]`}
      >
        <MandarinText className="text-white text-sm text-center">
          {label}
        </MandarinText>
      </View>
    </View>
  );
}
