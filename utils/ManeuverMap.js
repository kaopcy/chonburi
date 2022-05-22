import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import {
    faRightLong,
    faArrowUpLong,
    faLeftLong,
    faFerry,
    faTrain,
} from "@fortawesome/free-solid-svg-icons";

export const maneuverMap = (symbol) => {
    const shapeCase = (e) => e.toLowerCase().replace(/_/g, "-");
    switch (symbol) {
        case shapeCase("TURN_SLIGHT_RIGHT"):
            return faRightLong;
        case shapeCase("TURN_SHARP_RIGHT"):
            return faRightLong;
        case shapeCase("UTURN_RIGHT"):
            return faRightLong;
        case shapeCase("TURN_RIGHT"):
            return faRightLong;
        case shapeCase("RAMP_RIGHT"):
            return faRightLong;
        case shapeCase("FORK_RIGHT"):
            return faRightLong;
        case shapeCase("ROUNDABOUT_RIGHT"):
            return faRightLong;

        case shapeCase("TURN_SLIGHT_LEFT"):
            return faLeftLong;
        case shapeCase("TURN_SHARP_LEFT"):
            return faLeftLong;
        case shapeCase("UTURN_LEFT"):
            return faLeftLong;
        case shapeCase("TURN_LEFT"):
            return faLeftLong;
        case shapeCase("RAMP_LEFT"):
            return faLeftLong;
        case shapeCase("FORK_LEFT"):
            return faLeftLong;
        case shapeCase("ROUNDABOUT_LEFT"):
            return faLeftLong;

        case shapeCase("STRAIGHT"):
            return faArrowUpLong;

        case shapeCase("FERRY"):
            return faFerry;
        case shapeCase("FERRY_TRAIN"):
            return faTrain;

        default:
            return faQuestionCircle;
    }
    return;
};
