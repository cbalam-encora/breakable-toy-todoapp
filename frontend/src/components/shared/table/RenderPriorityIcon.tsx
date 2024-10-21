import {
  FcHighPriority,
  FcMediumPriority,
  FcLowPriority,
} from "react-icons/fc";

export const RenderPriorityIcon = (priority: string) => {
  switch (priority) {
    case "HIGH":
      return <FcHighPriority title="High Priority" className="text-2xl" />;
    case "MEDIUM":
      return <FcMediumPriority title="Medium Priority" className="text-2xl" />;
    case "LOW":
      return <FcLowPriority title="Low Priority" className="text-2xl" />;
    default:
      return null;
  }
};
