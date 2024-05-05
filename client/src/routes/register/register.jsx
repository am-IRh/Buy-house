import "./register.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

function Register() {
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	
	async function handleSubmit(e) {
		e.preventDefault();
		setError(false);

		const formData = new FormData(e.target);
		const reqBody = {
			username: formData.get("username"),
			email: formData.get("email"),
			password: formData.get("password"),
		};

		try {
			await apiRequest("/auth/register", { data: {...reqBody} });

			navigate("/login");
		} catch (err) {
			console.log(err.response.data.message);
			setError(err.response.data.message);
		}
	}
	return (
		<div className='register'>
			<div className='formContainer'>
				<form onSubmit={handleSubmit}>
					<h1>Create an Account</h1>
					<input name='username' type='text' placeholder='Username' />
					<input name='email' type='text' placeholder='Email' />
					<input name='password' type='password' placeholder='Password' />
					<button>Register</button>
					{error && <span>{error}</span>}
					<Link to='/login'>Do you have an account?</Link>
				</form>
			</div>
			<div className='imgContainer'>
				<img src='/bg.png' alt='' />
			</div>
		</div>
	);
}

export default Register;
