import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/common/redux/store'
import { makeInvisible } from '@/common/redux/signInModalSlice';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { useEffect, useState } from 'react';
import { useIsMount } from '../hooks/useIsMount';
import { ContinueWithGoogleButton } from './ContinueWithGoogleButton';

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

export const SignInModal = () => {
    const visible = useSelector((state: RootState) => state.signInModal.visible);
    const [modalWidth, setModalWidth] = useState(calculateModalWidth());
    const dispatch = useDispatch();
    const isMount = useIsMount();

    useEffect(() => {
        const handleResize = () => setModalWidth(calculateModalWidth());
        if (isMount === true)
            window.addEventListener('resize', () => handleResize());

        return () => window.removeEventListener('resize', handleResize);
    }, [modalWidth])

    return (
        <Rodal visible={visible} onClose={() => { dispatch(makeInvisible()) }}
            className='' width={modalWidth}>

            <div >

            </div>
            <ContinueWithGoogleButton
                onClick={() => { window.location.replace("/api/oauth/sign-in?provider=google"); }}
            />


            {/* <button
                onClick={(e) => {
                    e.preventDefault();

                    console.log("Clicked");

                    fetch("/api/Test/abcd",
                        {
                            credentials: "same-origin"
                        })
                        .then((response) => response.json())
                        .then((json) => console.log(json))
                        .catch((error) => {
                            console.log(error);
                            console.log("failed to fetch");
                        });
                }}
            >
                Auth test
            </button> */}
        </Rodal>
    )
}
