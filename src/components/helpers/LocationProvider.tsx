import { AnimatePresence } from "framer-motion";
import React from "react";

const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return <AnimatePresence mode='wait'>{children}</AnimatePresence>;
};

export default LocationProvider;
