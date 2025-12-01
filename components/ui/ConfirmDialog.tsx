// components/ui/ConfirmDialog.tsx

import React from "react";
import { Modal, Pressable, View } from "react-native";
import MandarinText from "./MandarinText";

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  visible,
  title,
  message,
  confirmText = "나가기",
  cancelText = "취소",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-[320px] bg-[#FFFFFF] rounded-[20px] px-6 py-8">
          {/* 제목 */}
          <MandarinText className="text-[24px] font-bold text-center mb-4">
            {title}
          </MandarinText>

          {/* 메시지 */}
          <MandarinText className="text-[16px] text-center text-gray-700 mb-8 leading-6">
            {message}
          </MandarinText>

          {/* 버튼 영역 */}
          <View className="flex-row justify-between gap-3">
            {/* 확인 버튼 */}
            <Pressable
              onPress={onConfirm}
              className="flex-1 bg-[#F5A623] py-4 rounded-[10px]"
            >
              <MandarinText className="text-white text-[18px] font-bold text-center">
                {confirmText}
              </MandarinText>
            </Pressable>

            {/* 취소 버튼 */}
            <Pressable
              onPress={onCancel}
              className="flex-1 bg-white border border-gray-300 py-4 rounded-[10px]"
            >
              <MandarinText className="text-gray-700 text-[18px] font-bold text-center">
                {cancelText}
              </MandarinText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

