export default function Welcome({name, setIsLoggedIn}) {
    const logoutBtn = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
    }
    return (
        <div>
            <h2>환영합니다. {name}님</h2>
            <button onClick={logoutBtn}>로그아웃</button>
        </div>
    )
}