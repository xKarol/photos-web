import { CronJob } from "cron";
import { sendNewsletters } from "../services/newsletter";

const scheduledFunctions = {} as {
  init: () => void;
};

scheduledFunctions.init = () => {
  new CronJob(
    "*/5 * * * *",
    async () => {
      await sendNewsletters();
    },
    null,
    true
  );
};

export default scheduledFunctions;
