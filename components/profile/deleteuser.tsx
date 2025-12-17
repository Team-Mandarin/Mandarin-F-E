import { authService } from "@/services/authService";
import { userService } from "@/services/userService";
import { router } from "expo-router";
import ConfirmDialog from "../ui/ConfirmDialog";

export default function DeleteUser({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}) {
  const handleWithdraw = async () => {
    try {
      const id = Number(await authService.getId());
      if (!id) {
        return;
      }
      await userService.deleteUser(id);
      await authService.logout();
      router.dismissAll();
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ConfirmDialog
      visible={showModal}
      title="정말 탈퇴하시나요?"
      message="탈퇴하면 기존에 있던 모든 정보가 사라져요."
      confirmText="탈퇴하기"
      onConfirm={handleWithdraw}
      onCancel={() => setShowModal(false)}
      className="bg-[#FF8A8A]"
    />
  );
}
