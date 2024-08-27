import { useDispatch, useSelector } from "react-redux";

import {
    selectIsSignInModalOpen,
    setIsSignInModalOpen,
} from "@/_redux/signInModalSlice";

import GoogleLoginButton from "@/_components/ui/GoogleLoginButton";
import CustomModal from "@/_components/modal/CustomModal";
import { Link } from "react-router-dom";

const SignInModal = () => {
    const dispatch = useDispatch();
    const isSignInModalOpen = useSelector(selectIsSignInModalOpen);

    return (
        <CustomModal
            onClose={() => dispatch(setIsSignInModalOpen(false))}
            isOpen={isSignInModalOpen}
        >
            <div className="flex flex-col px-6 pt-3 pb-2">
                <div className="font-semibold text-default-14-dark dark:text-default-12 flex flex-col items-start">
                    <p className="text-2xl">Login! 🐶</p>
                    <p>leave your comment!</p>
                </div>

                <div className="text-gray-500 text-xs">
                    <p className="mt-5">
                        I do not collect user info for personal use...
                    </p>
                    <Link
                        to="/privacy-policy"
                        onClick={() => dispatch(setIsSignInModalOpen(false))}
                        className="underline"
                    >
                        see more details
                    </Link>
                </div>

                <GoogleLoginButton className="mt-2" />
            </div>
        </CustomModal>
    );
};

export default SignInModal;
