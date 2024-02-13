import { useEffect, useState, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/common/redux/store'
import { makeInvisible } from '@/common/redux/signInModalSlice';
import { useIsMounted } from '@/common/hooks/useIsMounted';
import ContinueWithGoogleButton from '@/common/components/ContinueWithGoogleButton';

const Rodal = lazy(() => import("rodal"));
import 'rodal/lib/rodal.css';

const calculateModalWidth = () => {
    let result;

    if (document.body.clientWidth <= 880) {
        if (document.body.clientWidth >= 830)
            result = document.body.clientWidth - 880 - document.body.clientWidth;
        else
            result = document.body.clientWidth - 50;
    }
    else
        result = 830;
    return result;
}

const SignInModal = () => {
    const visible = useSelector((state: RootState) => state.signInModal.visible);
    const [modalWidth, setModalWidth] = useState(calculateModalWidth());
    const dispatch = useDispatch();
    const isMount = useIsMounted();

    useEffect(() => {
        const handleResize = () => setModalWidth(calculateModalWidth());
        if (isMount === true)
            window.addEventListener('resize', () => handleResize());

        return () => window.removeEventListener('resize', handleResize);
    }, [modalWidth])

    return (
        <Rodal visible={visible} onClose={() => { dispatch(makeInvisible()) }}
            width={modalWidth}
            className=''
        >
            <div className='w-full h-full flex flex-col items-center justify-between'>
                <span className='text-lg text-slate-800 font-bold'>Please Sign in...</span>

                <div className='flex flex-col gap-6 items-center'>
                    <ContinueWithGoogleButton
                        onClick={() => { window.location.replace("/api/oauth/sign-in?provider=google"); }}
                        className=''
                    />
                    <span>네이버 로그인 준비 중...</span>
                </div>
            </div>
        </Rodal>
    )
}

export default SignInModal;