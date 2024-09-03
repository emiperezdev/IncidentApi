import cron from "node-cron";
import { IncidentModel } from "../../data/models/incident.model";
import { EmailService } from "../services/EmailService";
import { IncidentDataSource } from "../datasources/IncidentDataSource";
import { generateIncidentEmailTemplate } from "../templates/email.template";

export const emailJob = () => {
  const emailService = new EmailService();
  const incidentDataSource = new IncidentDataSource();

  cron.schedule("*/10 * * * * *", async () => {
    console.log("Every 10 seconds...");
    
    const incidents = await IncidentModel.find({ isEmailSent: false });
    if (!incidents.length)
      return console.log("There are no incidents to send.");

    console.log(`>>> PROCESSING ${incidents.length} incidents...`);

    await Promise.all(
      incidents.map(async (incident) => {
        const htmlBody = generateIncidentEmailTemplate(
          incident.title,
          incident.description,
          incident.lat,
          incident.lng
        );
        await emailService.sendEmail({
          to: "emiperez.dev@gmail.com",
          subject: `Incident: ${incident.title}`,
          htmlBody: htmlBody,
        });
        const id = incident._id;
        console.log(`Email sent to the incident with id: ${id}`);
        await incidentDataSource.updateIncident(id.toString(), {
          ...incident,
          isEmailSent: true,
        });
        console.log(`Incident updated with id: ${id}`);
      })
    );
  });
};
