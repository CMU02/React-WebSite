import { useState } from "react"
import axios from "axios";

export default function LoginForm({ styleData, setIsLoggedIn, setName }) {

    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');

    const onClickBtn = async() => {
        if(!id || !pwd) {
            alert('아이디 및 비밀번호를 입력해주세요')
        } else if(pwd.length < 4) {
            alert('비밀번호는 4자리이상 입력해주세요.')
        }

        try {
            const response = await axios.post('http://localhost:3000/token/login', {id, pwd});
            const {token, username} = response.data;
            localStorage.setItem('jwt', token);
            localStorage.setItem('username', username);

            setName(username);
            setIsLoggedIn(true);

            alert('로그인 성공! 토큰 저장되었습니다.');
            setId('')
            setPwd('')
        } catch (error) {
            alert('로그인 실패 : ' + error.message);
        }
    }
    const idOnChange = (e) => {
        setId(e.target.value);
    }
    const pwdOnChange = (e) => {
        setPwd(e.target.value)
    }

    return (
        <div style={styleData}>
            <h2>Login {id}</h2>
            <input 
                type="text" 
                placeholder="ID" 
                value={id} 
                onChange={idOnChange}
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={pwd} 
                onChange={pwdOnChange} 
            />
        <button onClick={onClickBtn}>로그인하기</button>
        </div>
    )
}