import { Clock } from "lucide-react";

const ActivityLogs = ({ productData }) => {
    const activities = [
        {
            type: "Product Created",
            timestamp: Date.now(),
            performedBy: "Faiz Ullah Khan",
        },
        {
            type: "Product Updated",
            timestamp: Date.now(),
            performedBy: "Faiz Ullah Khan",
        },
        {
            type: "Product Deleted",
            timestamp: Date.now(),
            performedBy: "Faiz Ullah Khan",
        },
        {
            type: "Category Added",
            timestamp: Date.now(),
            performedBy: "Faiz Ullah Khan",
        },
        {
            type: "Category Updated",
            timestamp: Date.now(),
            performedBy: "Faiz Ullah Khan",
        },
        {
            type: "Stock Increased",
            timestamp: Date.now(),
            performedBy: "Faiz Ullah Khan",
        },
        {
            type: "Stock Decreased",
            timestamp: Date.now(),
            performedBy: "Faiz Ullah Khan",
        },
        {
            type: "Product Viewed",
            timestamp: Date.now(),
            performedBy: "Faiz Ullah Khan",
        },
        {
            type: "Order Placed",
            timestamp: Date.now(),
            performedBy: "Faiz Ullah Khan",
        },
        {
            type: "Order Cancelled",
            timestamp: Date.now(),
            performedBy: "Faiz Ullah Khan",
        },
    ];

    return (
        <div className="flex flex-col gap-6">
            <div className="flex gap-2 flex-col">
                <h3 className="flex gap-2">
                    <Clock /> Activity Logs
                </h3>
                <p>Complete history of all changes</p>
            </div>

            <div className="w-full flex flex-col gap-2 overflow-y-scroll h-[50vh]">
                {activities.length < 1 ? (
                    <p>No activity yet!</p>
                ) : (
                    activities.map((activity) => (
                        <div className="flex flex-col">
                            <div className="flex justify-between">
                                <div className="flex gap-6 items-center">
                                    <div className="w-3 h-3 rounded-full bg-primary" />
                                    <p className="font-semibold">
                                        {activity.type}
                                    </p>
                                </div>
                                <p className="text-gray-500">
                                    {new Date(
                                        activity.timestamp
                                    ).toLocaleString()}
                                </p>
                            </div>
                            <div className="pl-7 border-l-3 border-l-primary ml-1 pt-1 flex items-center gap-2 text-gray-500">
                                <span>
                                    <Clock size={16} />
                                </span>
                                <p>by {activity.performedBy}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ActivityLogs;
