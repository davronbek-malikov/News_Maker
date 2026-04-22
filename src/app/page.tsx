import { TodoApp } from "./todo-app";

const dashboardUrl =
  process.env.NEXT_PUBLIC_INSFORGE_DASHBOARD_URL ??
  "https://insforge.dev/dashboard/project/09edd8a4-b86f-4ca5-9205-8b82ba4e95db?route=/dashboard/database/tables";

export default function Home() {
  return <TodoApp dashboardUrl={dashboardUrl} />;
}
