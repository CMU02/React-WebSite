import { useState } from "react"
import axios from "axios";

export default function Login() {

    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    const [name, setName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const onClickBtn = async() => {
        try {
            const response = await axios.post('http://localhost:3000/token/login', {id, pwd});
            const {token, user} = response.data;
            localStorage.setItem('jwt', token);
            localStorage.setItem('username', user);

            setName(user);
            setIsLoggedIn(true);

            alert('로그인 성공! 토큰 저장되었습니다.');
            setId('')
            setPwd('')
        } catch (error) {
            console.log(error);
            if(!id || !pwd) {
                alert('아이디 및 비밀번호를 입력해주세요')
            } 
            if(pwd.trim() >= 4) {
                alert('비밀번호는 4자리이상 입력해주세요.')
            }
        }
    }
    const logoutBtn = async() => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
    }
    const idOnChange = (e) => {
        setId(e.target.value);

    }
    const pwdOnChange = (e) => {
        setPwd(e.target.value)
    }

    return (
        <div>
            {
                isLoggedIn ? (
                    <div>
                        <h2>환영합니다. {name}님</h2>
                        <button onClick={logoutBtn}>로그아웃</button>
                    </div>
                ) : (
                    <div>
                        <h2>Login {id}</h2>
                        <input type="text" placeholder="ID" value={id} onChange={idOnChange}/>
                        <input type="password" placeholder="Password" value={pwd} onChange={pwdOnChange} /><br />
                        <button onClick={onClickBtn}>로그인하기</button>
                    </div>
                )
            }
        </div>
    )
}