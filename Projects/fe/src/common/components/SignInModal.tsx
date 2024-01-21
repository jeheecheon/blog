import Rodal from 'rodal';

import 'rodal/lib/rodal.css';

export const SignInModal = ({ visible }: {
    visible: boolean
}) => {
    return (
        <Rodal visible={visible}>
            <div>Content</div>
        </Rodal>
    )
}
