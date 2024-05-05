import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Login() {
	const [error, setError] = useState(null);
	const [isLoading, setIsloading] = useState(false);
	const { updateUser } = useContext(AuthContext);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		setIsloading(true);

		const formData = new FormData(e.target);

		const reqBody = {
			username: formData.get("username"),
			password: formData.get("password"),
		};

		try {
			const res = await apiRequest("/auth/login", { data: { ...reqBody } });

			updateUser(res.data.user);

			navigate("/");
		} catch (err) {
			console.log(err);
			setError(err.response.data.message);
		} finally {
			setIsloading(false);
		}
	}

	return (
		<div className='login'>
			<div className='formContainer'>
				<form onSubmit={handleSubmit}>
					<h1>Welcome back</h1>
					<input name='username' type='text' placeholder='Username' />
					<input name='password' type='password' placeholder='Password' />
					<button disabled={isLoading}>Login</button>
					{error && <span>{error}</span>}
					<Link to='/register'>Dont you have an account?</Link>
				</form>
			</div>
			<div className='imgContainer'>
				<img src='/bg.png' alt='' />
			</div>
		</div>
	);
}

export default Login;
