import { AnimatePresence, motion } from "framer-motion";
import { nanoid } from "nanoid";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useNavigate } from "react-router";
import { clearMovies, setModalSettings } from "../slices/FetchMovieSlice";
import { useState } from "react";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const user = useAppSelector((store) => store.userSlice);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const HandleModalOpen = (id: string) => {
		let settings = { id: id, opened: true };
		dispatch(setModalSettings(settings));
	};
	const NavigateHandler = (path: string) => {
		if (path === "/") {
			setIsMenuOpen(!isMenuOpen);
			dispatch(clearMovies());
		}
		navigate(path);
	};
	return (
		<AnimatePresence>
			<motion.div className='bg-white flex flex-row items-center bg-opacity-30 shadow-2xl w-full p-5 box-border min-h-[8%]'>
				<motion.div className='menu flex'>
					<img
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className='cursor-pointer'
						src='https://img.icons8.com/ios-filled/50/menu--v6.png'
						alt='menu icon'
					/>
				</motion.div>
				{/* <motion.div className='flex flex-row justify-end w-full gap-2'>
					<motion.div className='genre flex'>
						<p className='font-bold text-[2em] uppercase'>{genre || ""}</p>
					</motion.div>
					<motion.div className='year flex '>
						<h2 className='font-bold text-[2em]'>{year || ""}</h2>
					</motion.div>
				</motion.div> */}
			</motion.div>
			{isMenuOpen && (
				<motion.menu
					key={nanoid(5)}
					className='absolute bg-white bg-opacity-95 z-[999] min-w-[15%] min-h-full left-0 drop-shadow-xl'
					initial={{ opacity: 0, x: -200 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.2, type: "just" }}
					exit={{ opacity: 0, x: -200 }}>
					<motion.section className='flex flex-col h-[100dvh]'>
						<motion.section className='flex flex-col items-center h-full w-full'>
							<motion.div className='flex flex-row p-5 items-center w-full'>
								<div className='flex font-bold text-[2em] cursor-default w-1/2'>
									Menu
								</div>
								<div
									className='flex w-1/2 cursor-pointer justify-end '
									onClick={() => setIsMenuOpen(!isMenuOpen)}>
									<img
										src='https://img.icons8.com/metro/26/delete-sign.png'
										alt='close'
									/>
								</div>
							</motion.div>
							<motion.div className='flex p-5 flex-col gap-5 text-[1.5em] w-full'>
								<motion.div
									className='cursor-pointer flex flex-row items-center bg-black text-white rounded-md justify-center hover:invert'
									onClick={() => NavigateHandler("/")}>
									<img
										className='w-[10%] invert'
										src='https://img.icons8.com/sf-regular/48/exterior.png'
										alt='home'
									/>
									<p className='pb-1 flex w-1/2 justify-center'>Home</p>
								</motion.div>
								<motion.div
									className='cursor-pointer flex flex-row items-center justify-center bg-black text-white rounded-md  hover:invert'
									onClick={() => HandleModalOpen("about")}>
									<img
										className='w-[10%] invert flex '
										src='https://img.icons8.com/sf-regular/48/info.png'
										alt='about'
									/>
									<p className='pb-1 flex w-1/2 justify-center '>About</p>
								</motion.div>
							</motion.div>
						</motion.section>
						<motion.footer className='flex flex-col items-center justify-end w-full p-5 text-[1.5em] gap-2 uppercase'>
							{!user.currentUser[0].email || !user.currentUser[0].id ? (
								<>
									<motion.div
										className='cursor-pointer flex flex-row items-center bg-black text-white rounded-md justify-center  hover:invert w-full'
										onClick={() => HandleModalOpen("signup")}>
										<img
											className='w-[10%] invert flex '
											src='https://img.icons8.com/sf-regular/48/add-user-male.png'
											alt='create account'
										/>
										<p className='pb-1 flex w-1/2 justify-center'>Sign up</p>
									</motion.div>
									<motion.div
										className='cursor-pointer flex flex-row items-center bg-black text-white rounded-md justify-center hover:invert w-full '
										onClick={() => HandleModalOpen("login")}>
										<img
											className='w-[10%] invert flex '
											src='https://img.icons8.com/sf-regular/48/enter-2.png'
											alt='log in'
										/>
										<p className='pb-1 flex w-1/2 justify-center'>Log in</p>
									</motion.div>{" "}
								</>
							) : (
								<motion.div className='flex justify-center items-center flex-col'>
									<h1 className='flex'>Logged in as:</h1>
									<p className='flex'>{user.currentUser[0].email}</p>
								</motion.div>
							)}
						</motion.footer>
					</motion.section>
				</motion.menu>
			)}
		</AnimatePresence>
	);
};

export default Header;
