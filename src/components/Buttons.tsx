import { Button } from "flowbite-react";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";

interface ButtonsProps {
	setPage: React.Dispatch<React.SetStateAction<number>>;
	page: number;
}

const Buttons: React.FC<ButtonsProps> = ({ setPage, page }) => {
	return (
		<div>
			<motion.div
				id='pages'
				className='flex flex-shrink justify-center items-center gap-2'>
				{Array.from({ length: 3 }, (_, index) => {
					return (
						<Button
							key={nanoid(5)}
							onClick={() => setPage(index + 1)}
							className='bg-transparent font-bold'>
							{index + 1}
						</Button>
					);
				}).map((el) => {
					return el;
				})}
			</motion.div>
		</div>
	);
};

export default Buttons;
