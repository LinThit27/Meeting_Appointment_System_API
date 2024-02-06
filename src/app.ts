import express, { Request, Response, Application } from "express";
import { testDbConnection } from "../config/db";
import cors from "cors";
import { timingMiddleware } from "./middleware/timing.middleware";
// import routes from "./routes/index";
import { globalErrorHandler } from "./middleware/error_handler.middleware";
import Department from "./models/Department";
import Room from "./models/Room";
import Account from "./models/Admin";
import Appointment from "./models/Appointment";
import WorkingHours from "./models/WorkingHours";

const app: Application = express();
// Department.sync();
// Room.sync();
// Account.sync();
// Appointment.sync();

testDbConnection().then(() => {
  Department.sync();
  Room.sync();
  Account.sync();
  WorkingHours.sync();
  Appointment.sync().then(() => {
    Appointment.belongsTo(Room, { constraints: true, onDelete: "CASCADE" });
    Room.hasMany(Appointment);

    Appointment.belongsTo(Department, { constraints: true, onDelete: "CASCADE" });
    Department.hasMany(Appointment);
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  });
}).catch((error: Error) => {
  console.error("Unable to connect to the database:", error);
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000/",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(timingMiddleware);
// app.use("/api/v1/", routes);
app.use(globalErrorHandler);

export default app;
