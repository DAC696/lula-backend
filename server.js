/* IMPORTING MODULES */
require('dotenv').config()
console.log("*** ENVIRONMENT === ", process.env.LULA_DASHBOARD_APP_ENV)

const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const socket = require("./socket");
const server = http.createServer(app);
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { EXPRESS_SERVER_PORT } = require("./utils/constants");
const connection = require("./dependencies/connectiondb");
const cors = require("cors");
const { StatusCodes } = require("http-status-codes");

/* ROUTES */
const userRoutes = require("./api/routes/users.routes");
const locationRoutes = require("./api/routes/locations.routes");
const clientRoutes = require("./api/routes/clients.routes");
const serviceRoutes = require("./api/routes/services.routes");
const departmentRoutes = require("./api/routes/departments.routes");
const unionRoutes = require("./api/routes/unions.routes");
const permissionRoutes = require("./api/routes/permissions.routes");
const roleRoutes = require("./api/routes/roles.routes");
const contractRoutes = require("./api/routes/contracts.routes");
const courseRoutes = require("./api/routes/courses.routes");
const employeeRoute = require("./api/routes/employees.routes");
const workHistoryRoute = require("./api/routes/workHistories.routes");
const notesRoute = require("./api/routes/notes.routes");
const ppeRoute = require("./api/routes/ppes.routes");
const trainingRoute = require("./api/routes/trainings.routes");
const appraisalRoute = require("./api/routes/appraisals.routes");
const safetyObservationRoute = require("./api/routes/safetyObservations.routes");
const ideasAndOpportunityRoute = require("./api/routes/ideasAndOpportunities.routes");
const meetingRoute = require("./api/routes/meetings.routes");
const ptwRoute = require("./api/routes/ptws.routes");
const incidentInvestigationRoute = require("./api/routes/incidentInvestigations.routes");
const locationRiskAssessmentRoute = require("./api/routes/locationRiskAssessments.routes");
const complianceRoute = require("./api/routes/compliances.routes");
const aspectsAndImpactRoute = require("./api/routes/aspectsAndImpacts.routes");
const consultationRoute = require("./api/routes/consultations.routes");
const nonConformanceRoute = require("./api/routes/nonConformances.routes");
const partRoute = require("./api/routes/parts.routes");
const equipmentRoute = require("./api/routes/equipments.routes");
const workOrderRoute = require("./api/routes/workOrders.routes");
const salaryCalculatorRoute = require("./api/routes/salaryCalculators.routes");
const documentRoute = require("./api/routes/documents.routes");

/*  HANDLING CORS */
app.options("*", cors());
app.use(cors());

/* MONGODB CONNECTION */

connection();

app.get("/favicon.ico", (req, res) => res.status(204));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({ limit: '50mb' }))


/* SERVING STATIC FILES */
app.use("/public", express.static(path.join(__dirname, "public")));

/*  ROUTE */
app.use("/users", userRoutes);
app.use("/employees", employeeRoute);
app.use("/locations", locationRoutes);
app.use("/clients", clientRoutes);
app.use("/services", serviceRoutes);
app.use("/departments", departmentRoutes);
app.use("/unions", unionRoutes);
app.use("/permissions", permissionRoutes);
app.use("/roles", roleRoutes);
app.use("/contracts", contractRoutes);
app.use("/courses", courseRoutes);
app.use("/workHistories", workHistoryRoute);
app.use("/notes", notesRoute);
app.use("/ppes", ppeRoute);
app.use("/trainings", trainingRoute);
app.use("/appraisals", appraisalRoute);
app.use("/safetyObservations", safetyObservationRoute);
app.use("/ideasAndOpportunities", ideasAndOpportunityRoute);
app.use("/meetings", meetingRoute);
app.use("/ptws", ptwRoute);
app.use("/incidentInvestigations", incidentInvestigationRoute);
app.use("/locationRiskAssessments", locationRiskAssessmentRoute);
app.use("/compliances", complianceRoute);
app.use("/aspectsAndImpacts", aspectsAndImpactRoute);
app.use("/nonConformances", nonConformanceRoute);
app.use("/consultations", consultationRoute);
app.use("/parts", partRoute);
app.use("/workOrders", workOrderRoute);
app.use("/equipments", equipmentRoute);
app.use("/salaryCalculators", salaryCalculatorRoute);
app.use("/documents", documentRoute);


/* HANDLING ERROR MIDDLEWARES */

app.use((req, res, next) => {
  const err = new Error("Route not found");
  err.status = StatusCodes.NOT_FOUND;
  next(err);
});

app.use((err, req, res, next) => {
  console.log("error in server server.js ", err);
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: err.message,
  });
});

const port = EXPRESS_SERVER_PORT;

/* lISTENING PORT */
server.listen(process.env.PORT || port, function () {
  console.log("Node server is up and running.. on port", port);
});

socket.connect(server);
