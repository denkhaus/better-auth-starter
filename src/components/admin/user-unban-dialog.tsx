"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { unbanUser } from "@/utils/auth";
import { UserWithDetails } from "@/utils/users";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { useTranslations } from "next-intl";

interface UserUnbanDialogProps {
  user: UserWithDetails;
  isOpen: boolean;
  onClose: () => void;
}

export function UserUnbanDialog({
  user,
  isOpen,
  onClose,
}: UserUnbanDialogProps) {
  const t = useTranslations("admin.users.unban_dialog");
  const [isLoading, setIsLoading] = useState(false);

  const handleUnbanUser = async () => {
    try {
      setIsLoading(true);
      await unbanUser(user.id);
      toast.success(
        t("success_message", { userName: user.name || user.email })
      );
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ConfirmationDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleUnbanUser}
      title={t("title", { userName: user.name || user.email })}
      description={t("description")}
      confirmText={isLoading ? t("processing") : t("unban_user")}
    />
  );
}
