import { useAppSelector } from "../hooks";

const InformationComponent = () => {
	const isLoading = useAppSelector((store) => store.isLoading);
	const errorMessage = useAppSelector((store) => store.errorMessage);
	if (isLoading) {
		return (
			<div className='text-white flex justify-center text-[32px] items-center'>
				Loading...
			</div>
		);
	}
	if (errorMessage) {
		return (
			<div className='text-white flex justify-center text-[32px] items-center'>
				{errorMessage}
			</div>
		);
	}
	return null;
};

export default InformationComponent;
