import landingImage from '../assets/img.jpg'
import { useNavigate } from 'react-router-dom';
import '../App.css'


function CreateAccountMsg(){
    const navigate = useNavigate()
    return (
    <>
        <div className='home-page'>  
            <h1>You have to login before you can apply for a job</h1>
            <div className="home-buttons">
                <p className='login-link'>
                    Already have an account?{' '}
                    <button onClick={() => navigate("/login")} className="login-btn">Login</button>
                </p>
                <p className='login-link'>
                    Don't yet have an account?{' '}
                    <button onClick={() => navigate("/register")} className="login-btn">Create account</button>
                </p>
                
                    <button onClick={() => navigate("/")} className="login-btn">Back </button>
                
            </div>
        </div>
        
        </>
       
    )
}

export default CreateAccountMsg;