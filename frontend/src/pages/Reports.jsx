import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState("");
  const [openReports, setOpenReports] = useState({});

  // Retrieve permissions from localStorage
  const storedPermissions = localStorage.getItem("permissions");
  const permissions = storedPermissions ? JSON.parse(storedPermissions) : [];

  // Check if user has "view" permission for the "report" module
  const canViewReports = permissions.some(
    (perm) =>
      perm.module.toLowerCase() === "report" &&
      perm.actions.map((action) => action.toLowerCase()).includes("View")
  );

  if (!canViewReports) {
    return <div>Insufficient permissions to view reports.</div>;
  }

  const reportsList = [
    "Profit & Loss Report",
    "Sales & Payment Report",
    "Customer Orders",
    "GSTR-1 Report",
    "GSTR-2 Report",
    "Sales GST Report",
    "Purchase GST Report",
    "Sales Tax Report",
    "Purchase Tax Report",
    "Supplier Items Report",
    "Sales Report",
    "Sales Return Report",
    "Seller Points Report",
    "Purchase Report",
    "Purchase Return Report",
    "Expense Report",
    "Stock Report",
    "Sales Item Report",
    "Return Items Report",
    "Purchase Payments Report",
    "Sales Payments Report",
    "Sales Return Payments",
    "Stock Transfer Report",
    "Sales Summary Report",
  ];

  const handleReportClick = (report) => {
    setSelectedReport(report);
    setOpenReports((prevState) => ({
      ...prevState,
      [report]: !prevState[report],
    }));
    navigate(`/reports/${report.toLowerCase().replace(/ /g, "-")}`);
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">Reports</h2>
      <ul className="list-disc pl-6">
        {reportsList.map((report, index) => (
          <li
            key={index}
            className="cursor-pointer text-blue-600 hover:underline"
            onClick={() => handleReportClick(report)}
          >
            {report}
          </li>
        ))}
      </ul>

      {/* Right-side dropdown for the selected report */}
      <div className="absolute right-0 top-16">
        {selectedReport && openReports[selectedReport] && (
          <div
            className="mt-4 p-4 border border-gray-300 rounded-lg bg-white shadow-md transition-all duration-300"
            style={{ width: "300px", display: "block" }}
          >
            <h3 className="text-lg font-semibold">
              Details of {selectedReport}:
            </h3>
            <p>{`Here are the details of the ${selectedReport}.`}</p>
            <p>More details or content can be added here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
