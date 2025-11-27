import React from "react";

const colorClasses = {
    sky: "bg-sky-100 text-sky-600",
    emerald: "bg-emerald-100 text-emerald-600",
    amber: "bg-amber-100 text-amber-600",
    rose: "bg-rose-100 text-rose-600",
    violet: "bg-violet-100 text-violet-600",
    indigo: "bg-indigo-100 text-indigo-600",
    cyan: "bg-cyan-100 text-cyan-600",
    lime: "bg-lime-100 text-lime-600",
    slate: "bg-slate-100 text-slate-600",
    fuchsia: "bg-fuchsia-100 text-fuchsia-600",
    pink: "bg-pink-100 text-pink-600",
    teal: "bg-teal-100 text-teal-600",
    yellow: "bg-yellow-100 text-yellow-600",
    orange: "bg-orange-100 text-orange-600",
    purple: "bg-purple-100 text-purple-600",
};

const Stat = ({ icon: Icon, mainText, subText, color = "sky" }) => {
    return (
        <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-300 bg-white w-full">
            <div className={`p-3 rounded-full ${colorClasses[color]}`}>
                {Icon && <Icon size={22} />}
            </div>

            <div>
                <p className="text-sm text-gray-500">{subText}</p>
                <h3 className="text-xl font-semibold">{mainText}</h3>
            </div>
        </div>
    );
};

export default Stat;
