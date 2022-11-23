import styled from 'styled-components';
import iconSetting from '@carrot/core/assets/icon/mycarrot/Settings.svg';
import iconProfile from '@carrot/core/assets/icon/mycarrot/Portrait.svg';

const Profile = () => {

    return (
        <Contain>
            <Topbar>
                <Setting src={iconSetting}></Setting>
            </Topbar>
            <Prof>
                <Prof_r>
                    <Profimg src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg" alt="" />
                    닉네임
                </Prof_r>
                <Btn>프로필 보기</Btn>
            </Prof>
        </Contain>
    )

};

export default Profile;

const Contain = styled.div`
    height: 130px;
`

const Topbar = styled.div`
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

const Setting = styled.img`
width: 30px;
height: 30px;
margin: 15px;`

const Prof = styled.div`
height: 80px;
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 15px;
&:hover {
    background: rgb(247,247,247);
}
`

const Prof_r = styled.span`
display: flex;
align-items: center;
font-size: 20px;
`

const Profimg = styled.img`
width: 45px;
height: 45px;
margin-right: 11px;`

const Btn = styled.button`
background: #eeeeee;
padding: 10px;
border-radius: 5px;
`