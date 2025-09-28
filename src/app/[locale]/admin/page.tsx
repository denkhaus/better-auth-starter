import { redirect } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

const AdminPage = async ({ params }: Props) => {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  redirect({ href: "/admin/users", locale });
};

export default AdminPage;
