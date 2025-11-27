import { View } from "react-native";
import { loveTypeInfo } from "../../constants/loveTypeInfo";
import MandarinText from "../ui/MandarinText";

export default function MyLoveTypePage() {
  // 저장된 사용자 정보 가져온 뒤 출력 진행
  const loveType = "0001"; // TODO: 백엔드에서 가져온 러브타입으로 교체

  const typeInfo = loveTypeInfo[loveType] || {
    name: "알 수 없음",
    description: "",
  };

  return (
    <View>
      <MandarinText>만다린님은</MandarinText>
      <MandarinText>{typeInfo.name}입니다.</MandarinText>
      <MandarinText>{typeInfo.description}</MandarinText>
    </View>
  );
}
