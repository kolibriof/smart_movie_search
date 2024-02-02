import { createContext, useState } from "react";

interface ModalContextProps {
	isMenuOpen: boolean;
	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const InitialModalContextProps: ModalContextProps = {
	isMenuOpen: false,
	setIsMenuOpen: () => {},
};

export const modalContext = createContext(InitialModalContextProps);

const ModalContextWrapper: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	return (
		<modalContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
			{children}
		</modalContext.Provider>
	);
};

export default ModalContextWrapper;
