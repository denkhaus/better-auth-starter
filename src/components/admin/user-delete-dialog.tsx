"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { deleteUser } from "@/utils/auth";
import { UserWithDetails } from "@/utils/users";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { useTranslations } from "next-intl";

interface UserDeleteDialogProps {
  user: UserWithDetails;
  isOpen: boolean;
  onClose: () => void;
}

export function UserDeleteDialog({
  user,
  isOpen,
  onClose,
}: UserDeleteDialogProps) {
  const t = useTranslations("admin.users.delete_dialog");
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteUser = async () => {
    try {
      setIsLoading(true);
      await deleteUser(user.id);
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
      onConfirm={handleDeleteUser}
      title={t("title", { userName: user.name || user.email })}
      description={t("description")}
      confirmText={isLoading ? t("processing") : t("delete_user")}
      confirmVariant="destructive"
    />
  );
}
