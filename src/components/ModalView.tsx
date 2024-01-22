import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../hooks";

import Modal from "react-modal";
import { closeModal } from "../slices/FetchMovieSlice";

const ModalView: any = () => {
	const dispatch = useAppDispatch();
	const movies = useAppSelector((store) => store.movies);
	const ModalSettings = useAppSelector((store) => store.ModalSettings);
	if (ModalSettings.opened && ModalSettings.id) {
		return (
			<Modal
				style={{
					overlay: {
						backgroundColor: "rgba(255, 255, 255, 0.9)",
					},
					content: {
						animation: "modalAppear 0.3s ease-in-out",
					},
				}}
				shouldCloseOnOverlayClick={true}
				onRequestClose={() => dispatch(closeModal())}
				shouldCloseOnEsc={true}
				isOpen={ModalSettings.opened}
				className='flex flex-col justify-center items-center bg-white h-fit  translate-x-[50%] translate-y-[50%] rounded-2xl !outline-none shadow-2xl p-5 w-1/2 min-h-[50dvh]'>
				<div
					className='absolute right-3 top-2 cursor-pointer bg-red-500 rounded-full p-1 shadow-lg'
					onClick={() => dispatch(closeModal())}>
					<img
						src='https://img.icons8.com/color/48/cancel--v1.png'
						alt='close button'
						className='w-5'
					/>
				</div>
				{movies[ModalSettings.page || 1]
					.filter((i) => i.id === ModalSettings.id)
					.map((i) => {
						return (
							<>
								<div className='flex'>
									<h3 className='font-bold text-[1.5rem] pb-5'>
										{i.titleText.text}
									</h3>
								</div>
								<div className='flex justify-center gap-16 items-center flex-row flex-grow w-full'>
									<div className='flex max-w-[50%]'>
										<img
											src={i.primaryImage ? i.primaryImage.url : ""}
											alt={i.titleText.text}
											className='rounded-lg border-solid border-4 border-black shadow-lg max-w-[50%]'
										/>
									</div>
									<div className='flex w-1/4  '>
										<p>
											{i.plot
												? i.plot.plotText.plainText
												: "No plot available."}
										</p>
									</div>
								</div>
							</>
						);
					})}
			</Modal>
		);
	}
	return;
};

export default ModalView;
