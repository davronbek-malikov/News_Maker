import { createHashRouter } from "react-router";
import { MainLayout } from "./components/MainLayout";
import { Dashboard } from "./pages/Dashboard";
import { Content } from "./pages/Content";
import { Timeline } from "./pages/Timeline";
import { Editor } from "./pages/Editor";
import { ApprovalQueue } from "./pages/ApprovalQueue";
import { Analytics } from "./pages/Analytics";
import { Settings } from "./pages/Settings";
import { DailySummary } from "./pages/DailySummary";
import { WeeklySummary } from "./pages/WeeklySummary";
import { DesignSystem } from "./pages/DesignSystem";

export const router = createHashRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "design-system", Component: DesignSystem },
      { path: "content", Component: Content },
      { path: "timeline", Component: Timeline },
      { path: "editor", Component: Editor },
      { path: "editor/:id", Component: Editor },
      { path: "approval", Component: ApprovalQueue },
      { path: "analytics", Component: Analytics },
      { path: "settings", Component: Settings },
      { path: "daily-summary", Component: DailySummary },
      { path: "weekly-summary", Component: WeeklySummary },
    ],
  },
]);
