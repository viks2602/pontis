import { z } from "zod";

export const AlertSchema = z.object({
    server: z.string().min(1, {
      message: "Required",
    }),
    alertType: z.string().min(1, {
      message: "Required",
    }),
    notificationType: z.string().min(1, {
      message: "Required",
    }),
    alertName: z.string().min(1, {
      message: "Required",
    }),
    recipientEmailId: z.string().email().min(1, {
      message: "Required",
    }),
    durationToAlert: z.string().min(1, {
      message: "Required",
    }),
    durationToReminder: z.string().min(1, {
      message: "Required",
    }),
    sendNotification: z.boolean(),
  });