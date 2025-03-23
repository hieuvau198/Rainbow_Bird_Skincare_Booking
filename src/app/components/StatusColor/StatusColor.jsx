export const StatusColor = (status) => {
    switch (status) {
        case "Await Confirmation":
            return "warning";
        case "Confirmed":
            return "green";
        case "Cancelled By Customer":
        case "Cancelled By Staff":
        case "Incomplete":
        case "No Show":
            return "volcano";
        case "Checked In":
            return "blue";
        case "In Progress":
        case "Pending":
            return "orange";
        case "Completed":
            return "green";
        case "Checked Out":
            return "volcano";
        default:
            return "default";
    }
};
