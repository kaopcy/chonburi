import React from "react";

const TripContent = ({ trip }) => {
    return (
        <div className="flex flex-col">
            {trip.days.map((day) => (
                <div key={day._key} className="">
                    {day.activities.map((activity) => (
                        <div key={activity._key} className="">
                            ควย
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TripContent;
