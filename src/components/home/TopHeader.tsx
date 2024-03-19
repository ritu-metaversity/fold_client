import { Link, useNavigate } from 'react-router-dom'
import './TopHeader.css'
import { useContext } from 'react';
import { UserContext } from '../../App';

const TopHeader = () => {
    const { isSignedIn, setModal } = useContext(UserContext);
    const navigate = useNavigate();

    const openLoginModal = () => {
        if (setModal) {
            setModal({ login: true });
        }
    };

    return (
        <div className="new-event">
            <div className="new-event-item sport4">
                <div
                className='link_div'
                    onClick={() =>
                        isSignedIn
                            ? navigate(
                                "/sports/details/?match-id=28127348&sport-id=4"
                            )
                            : openLoginModal()
                    }
                >
                    <i className="d-icon icon-4" />{" "}
                    <span className="ml-2" style={{ color: "rgb(248, 249, 250)" }}>
                        IPL - 2024
                    </span>
                </div>
            </div>
            <div className="new-event-item sport2">
                <div
                className='link_div'
                 onClick={() =>
                    isSignedIn
                        ? navigate(
                            "/sports/details/?match-id=1706456690&sport-id=6"
                        )
                        : openLoginModal()
                }
                    
                >
                    <i className="d-icon icon-40" />{" "}
                    <span className="ml-2" style={{ color: "rgb(248, 249, 250)" }}>
                        ELECTION - 2024
                    </span>
                </div>
            </div>
        </div>

    )
}

export default TopHeader