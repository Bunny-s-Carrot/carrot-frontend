import styled from 'styled-components';
import iconSetting from '@carrot/core/assets/icon/mycarrot/Settings.svg';

const Profile = () => {

    return (
        <Contain>
            <Topbar>
                <Setting src={iconSetting}></Setting>
            </Topbar>
            <Prof>
                <ProfR>
                    <Profimg src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg" alt="" />
                    닉네임
                </ProfR>
                <Btn>프로필 보기</Btn>
            </Prof>
        </Contain>
    )

};

export default Profile;

const Contain = styled.div`
    height: 13rem;
`

const Topbar = styled.div`
    height: 5rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

const Setting = styled.img`
width: 3rem;
height: 3rem;
margin: 1.5rem;`

const Prof = styled.div`
height: 8rem;
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 1.5rem;
&:hover {
    background: rgb(247,247,247);
}
`

const ProfR = styled.span`
display: flex;
align-items: center;
font-size: 2rem;
`

const Profimg = styled.img`
width: 4.5rem;
height: 4.5rem;
margin-right: 1.1rem;`

const Btn = styled.button`
background: #eeeeee;
padding: 1rem;
border-radius: 0.5rem;
`