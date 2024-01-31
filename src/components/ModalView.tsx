import { useAppDispatch, useAppSelector } from "../hooks";
import Modal from "react-modal";
import { closeModal } from "../slices/FetchMovieSlice";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import {
	UserCredsProps,
	addFavFilm,
	addLikedFilm,
	createUser,
	loginUser,
	readDB,
} from "../slices/FetchUserSlice";
import { AnimatePresence, motion } from "framer-motion";

const ModalView: any = () => {
	Modal.setAppElement("#root");
	const dispatch = useAppDispatch();
	const { errorMessage, currentUser } = useAppSelector(
		(store) => store.userSlice,
	);
	const [authUser, setAuthUser] = useState<{ email: string; password: string }>(
		{
			email: "",
			password: "",
		},
	);
	const markFilm = (type: "liked" | "fav", id: string) => {
		let tempSettings = {
			filmID: id,
			userID: currentUser[0].id || "",
		};
		if (type === "liked") {
			dispatch(addLikedFilm(tempSettings));
		}
		if (type === "fav") {
			dispatch(addFavFilm(tempSettings));
		}
	};
	const handleAuthSubmit = async (
		event: React.FormEvent<HTMLFormElement>,
		type: string | "login" | "signup",
		creds: UserCredsProps,
	) => {
		event.preventDefault();
		if (type === "login") {
			try {
				const success: any = await dispatch(loginUser(creds));
				if (!success.payload.id) {
					return;
				} else {
					dispatch(readDB(success.payload.id));
					dispatch(closeModal());
				}
			} catch (error) {
				console.log("Credentials error.");
			}
		}
		if (type === "signup") {
			try {
				const success: any = await dispatch(createUser(creds));
				if (!success.payload.id) {
					return;
				} else {
					dispatch(readDB(success.payload.id));
					dispatch(closeModal());
				}
			} catch (error) {
				console.log("Credentials error.");
			}
		}
	};
	const movies = useAppSelector((store) => store.movieSlice.movies);
	const ModalSettings = useAppSelector(
		(store) => store.movieSlice.ModalSettings,
	);
	if (ModalSettings.opened && ModalSettings.id && ModalSettings.page) {
		return (
			<Modal
				appElement={document.getElementById("main")!}
				style={{
					overlay: {
						backgroundColor: "rgba(255, 255, 255, 0.8)",
					},
					content: {
						animation: "modalAppear 0.3s ease-in-out",
					},
				}}
				shouldCloseOnOverlayClick={true}
				onRequestClose={() => dispatch(closeModal())}
				shouldCloseOnEsc={true}
				isOpen={ModalSettings.opened}
				className='flex flex-col justify-center items-center bg-white bg-opacity-90 h-fit  translate-x-[50%] translate-y-[50%] rounded-2xl !outline-none shadow-2xl p-5 w-1/2 md:min-h-[50dvh]'>
				{currentUser[0].id && (
					<div className='absolute right-2 top-10'>
						<div className='flex flex-col p-1 gap-2'>
							<button onClick={() => markFilm("fav", ModalSettings.id)}>
								FAV
							</button>
							<button onClick={() => markFilm("liked", ModalSettings.id)}>
								LIKE
							</button>
						</div>
					</div>
				)}
				<div
					className='absolute right-3 top-2 cursor-pointer bg-red-500 rounded-full p-1 shadow-lg hover:drop-shadow-xl transition-all duration-150 hover:scale-105 ease-out '
					onClick={() => dispatch(closeModal())}>
					<img
						src='https://img.icons8.com/color/48/cancel--v1.png'
						alt='close button'
						className='w-5 '
					/>
				</div>
				{movies[ModalSettings.page || 1]
					.filter((i) => i.id === ModalSettings.id)
					.map((i) => {
						return (
							<section
								className='flex flex-col justify-center items-center p-5 min-h-[50dvh] '
								key={i.id}>
								<div className='flex'>
									<h3 className='font-bold text-[1.5rem] pb-5'>
										{i.titleText.text}
									</h3>
								</div>
								<div className='flex justify-center md:gap-16 sm:gap-8 items-center md:flex-row sm:flex-col flex-grow w-full'>
									<div className='flex md:max-w-[50%] sm:max-w-[77%] justify-center'>
										<img
											src={
												i.primaryImage
													? i.primaryImage.url
													: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019"
											}
											alt={i.titleText.text}
											className='rounded-lg border-solid border-4 border-black border-opacity-20 shadow-lg md:max-w-[60%] sm:max-w-[100%]'
										/>
									</div>
									<div className='flex w-1/2 sm:w-[75%] flex-col justify-'>
										<div className='flex flex-row gap-2'>
											<label htmlFor='year' className='font-bold'>
												Year released:
											</label>
											<p id='year'>{i.releaseYear.year}</p>
										</div>
										<div className='flex flex-row gap-2 items-center'>
											<label htmlFor='genre' className='font-bold'>
												Genres:
											</label>
											<div
												id='genre'
												className='inline-flex gap-2 text-white font-semibold md:whitespace-nowrap overflow-hidden hover:overflow-scroll '>
												{i.genres.genres.map((i: any) => {
													return (
														<p className='bg-slate-400 rounded-md p-1 shadow-sm '>
															{i.text}
														</p>
													);
												})}
											</div>
										</div>
										<div className='flex flex-row gap-2 sm:w-[100%]'>
											<label htmlFor='plot' className='font-bold'>
												Plot:
											</label>
											<p id='plot'>
												{i.plot && i.plot.plotText
													? i.plot.plotText.plainText
													: "No plot available."}
											</p>
										</div>
									</div>
								</div>
							</section>
						);
					})}
			</Modal>
		);
	}
	if (ModalSettings.opened) {
		if (ModalSettings.id === "about") {
			return (
				<Modal
					appElement={document.getElementById("main")!}
					style={{
						overlay: {
							backgroundColor: "rgba(255, 255, 255, 0.8)",
						},
						content: {
							animation: "modalAppear 0.3s ease-in-out",
						},
					}}
					shouldCloseOnOverlayClick={true}
					onRequestClose={() => dispatch(closeModal())}
					shouldCloseOnEsc={true}
					isOpen={ModalSettings.opened}
					className='flex flex-col justify-center items-center bg-white bg-opacity-90 h-fit  translate-x-[50%] translate-y-[50%] rounded-2xl !outline-none shadow-2xl p-5 w-1/2 md:min-h-[50dvh]'>
					<div className=''>
						<h1 className='font-bold uppercase'>Created by kolibriof</h1>
					</div>
				</Modal>
			);
		}
		if (ModalSettings.id === "signup" || ModalSettings.id === "login") {
			return (
				<Modal
					appElement={document.getElementById("main")!}
					style={{
						overlay: {
							backgroundColor: "rgba(255, 255, 255, 0.8)",
						},
						content: {
							animation: "modalAppear 0.3s ease-in-out",
						},
					}}
					shouldCloseOnOverlayClick={true}
					onRequestClose={() => dispatch(closeModal())}
					shouldCloseOnEsc={false}
					isOpen={ModalSettings.opened}
					className='flex flex-col justify-center items-center bg-white bg-opacity-90 h-fit  translate-x-[50%] translate-y-[50%] rounded-2xl !outline-none shadow-2xl p-5 w-1/2 md:min-h-[50dvh]'>
					<div
						className='absolute right-3 top-2 cursor-pointer bg-red-500 rounded-full p-1 shadow-lg hover:drop-shadow-xl transition-all duration-150 hover:scale-105 ease-out '
						onClick={() => dispatch(closeModal())}>
						<img
							src='https://img.icons8.com/color/48/cancel--v1.png'
							alt='close button'
							className='w-5 '
						/>
					</div>
					<section className='flex flex-col justify-center items-center gap-3 w-full'>
						<header className='flex uppercase'>
							{ModalSettings.id === "signup"
								? "Create the account"
								: "Log in into your account"}
						</header>
						<form
							className='flex flex-col gap-2 w-1/2'
							onSubmit={(e) => handleAuthSubmit(e, ModalSettings.id, authUser)}>
							<TextField
								variant='outlined'
								value={authUser.email}
								onChange={(e) => {
									setAuthUser({ ...authUser, email: e.target.value });
								}}
								label='Email'
								sx={{
									"& .MuiOutlinedInput-root": {
										"& fieldset": {
											borderColor: "black",
											color: "black",
										},
									},
									"& .MuiInputBase-input": {
										color: "black",
									},
								}}
							/>
							<TextField
								variant='outlined'
								label='Password'
								type='password'
								value={authUser.password}
								onChange={(e) => {
									setAuthUser({ ...authUser, password: e.target.value });
								}}
							/>
							<Button variant='outlined' type='submit'>
								{ModalSettings.id === "signup" ? "Create account" : "Log in"}
							</Button>
						</form>
						<AnimatePresence mode='wait'>
							{errorMessage && (
								<motion.div
									className='flex justify-center items-center text-red-500 font-semibold'
									initial={{ y: -100, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									exit={{ y: -100, opacity: 0 }}>
									<motion.p>{errorMessage}</motion.p>
								</motion.div>
							)}
						</AnimatePresence>
					</section>
				</Modal>
			);
		}
	}
	return;
};

export default ModalView;
