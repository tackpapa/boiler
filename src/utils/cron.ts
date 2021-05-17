import cron from 'node-cron';
import db from 'db';

cron.schedule(
  '0 0 * * *',
  async () => {
    let weeks = new Date();
    weeks.setDate(weeks.getDate() - 14);
    try {
      const del = await db.chats.deleteMany({ createdAt: { $lte: weeks } });
    } catch (e) {
      console.log(e);
    }
  },
  {
    scheduled: true,
  }
);
