import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, View } from "react-native";
import MandarinText from "./MandarinText";

interface CharacterListItemProps {
    characterId: number;
    name: string;
    imageUrl: string;
    // 추후 필요한 속성 추가할 수 있으면 하기
    // 예 : Last chat date, etc...
    onPress: (id: number) => void;
}

export default function CharacterListItem({ 
    characterId, 
    name, 
    imageUrl, 
    onPress 
}: CharacterListItemProps) {

    const hasImage = imageUrl && imageUrl.length > 0;

    return (
        <Pressable
            onPress={() => onPress(characterId)}
            className="flex-row items-center px-4 py-3 bg-white rounded-[15px]">

            {/* 1. 프로필 이미지 : 원형, 크기 60x60 px */}
            <View className="w-[60px] h-[60px] rounded-full overflow-hidden mr-4 bg-gray-200 items-center justify-center">
                {hasImage ? (
                    <Image
                        source={{ uri: imageUrl }}
                        className="w-[60px] h-[60px]"
                        resizeMode="cover"
                    />
                ) : (
                    <Ionicons name="person" size={30} color="#9CA3AF" />
                )}
            </View>

            {/* 2. 캐릭터 이름 정보 영역 */}
            <View className="flex-1 justify-center">
                <MandarinText className="text-lg font-medium text-gray-800">
                    {name}
                </MandarinText>
            </View>

            {/* 3. 우측 화살표 아이콘 */}
            <Ionicons name="chevron-forward" size={24} color="#717171" />
        </Pressable>
    )

}