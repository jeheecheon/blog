import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/common/redux/store'
import { makeInvisible } from '@/common/redux/signInModalSlice';
import { useIsMounted } from '@/common/hooks/useIsMounted';
import Rodal from "rodal";
import ContinueWithGoogleButton from '@/common/components/ContinueWithGoogleButton';
import { calculateModalWidth } from '@/common/utils/modal'

import 'rodal/lib/rodal.css';

const SignInModal = () => {
    const visible = useSelector((state: RootState) => state.signInModal.visible);
    const [modalWidth, setModalWidth] = useState(calculateModalWidth());
    const dispatch = useDispatch();
    const isMount = useIsMounted();
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

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
            customStyles={{
                backgroundColor: `${isDarkMode ? 'rgb(24, 24, 27)' : 'rgb(250, 250, 250)'}`,
                borderRadius: '22px',
                padding: '25px 30px 25px 30px'
            }}
        >
            <div className='w-full h-full flex flex-col items-center'>
                <h1 className='text-2xl md:text-3xl font-bold mb-[70px] text-orange-400'>Please Sign in!</h1>

                <div className='flex flex-col gap-6 items-center justify-center'>
                    <ContinueWithGoogleButton
                        onClick={() => { window.location.replace("/api/oauth/sign-in?provider=google"); }}
                        className=''
                    />
                    {/* <span>네이버 로그인 준비 중...</span> */}
                </div>
            </div>
        </Rodal>
    )
}

export default SignInModal;