import type { Metadata } from "next";
import { UsersTable } from "@/components/admin/users-table";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.users");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <UsersTable />
    </div>
  );
}
