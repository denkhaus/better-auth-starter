"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { banUser } from "@/utils/auth";
import { Label } from "@/components/ui/label";
import { UserWithDetails } from "@/utils/users";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

interface UserBanDialogProps {
  user: UserWithDetails;
  isOpen: boolean;
  onClose: () => void;
}

export function UserBanDialog({ user, isOpen, onClose }: UserBanDialogProps) {
  const t = useTranslations("admin.users.ban_dialog");
  const [reason, setReason] = useState("");
  const [banDuration, setBanDuration] = useState("7"); // Default to 7 days
  const [isLoading, setIsLoading] = useState(false);

  // Ban duration options in days
  const BAN_DURATIONS = [
    { label: t("duration_1_day"), value: "1" },
    { label: t("duration_3_days"), value: "3" },
    { label: t("duration_7_days"), value: "7" },
    { label: t("duration_14_days"), value: "14" },
    { label: t("duration_30_days"), value: "30" },
    { label: t("duration_90_days"), value: "90" },
    { label: t("duration_permanent"), value: "permanent" },
  ];

  const handleBanUser = async () => {
    try {
      setIsLoading(true);
      // Convert duration from days to seconds
      let banExpiresIn: number | undefined;
      if (banDuration === "permanent") {
        banExpiresIn = undefined;
      } else {
        banExpiresIn = parseInt(banDuration) * 24 * 60 * 60; // Days to seconds
      }

      await banUser(user.id, reason, banExpiresIn);
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
      onConfirm={handleBanUser}
      title={t("title", { userName: user.name || user.email })}
      description={t("description")}
      confirmText={isLoading ? t("processing") : t("ban_user")}
      confirmVariant="destructive"
    >
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="reason">{t("reason_label")}</Label>
          <Textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={t("reason_placeholder")}
            className="resize-none"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="banDuration">{t("duration_label")}</Label>
          <Select value={banDuration} onValueChange={setBanDuration}>
            <SelectTrigger id="banDuration" className="w-full">
              <SelectValue placeholder={t("select_duration")} />
            </SelectTrigger>
            <SelectContent>
              {BAN_DURATIONS.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="hover:bg-muted"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </ConfirmationDialog>
  );
}
