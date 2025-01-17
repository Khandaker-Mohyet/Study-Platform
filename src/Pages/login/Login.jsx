import { Link, useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import lotty from '../../assets/Login.json'
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import Google from "../../Components/Google";


const Login = () => {

  const { logInUser } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state ||"/"
  

  const handelLogIn = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    console.log(email, password)

    logInUser(email, password)
      .then(result => {
        console.log(result)
        navigate(from);
        toast.success('Successfully login!')
      })
      .catch(error =>{
        console.log(error)
        toast.error("email and password don't match")
      })
    
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <Lottie className='w-[500px] h-full' animationData={lotty}></Lottie>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handelLogIn} className="card-body">
          <h2 className='text-2xl font-bold text-center'>Login your account</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-success">Login</button>
        </div>
          </form>
          <Google></Google>
          <p className='text-center mb-3'>Dont’t Have An Account ? <Link className='text-red-600' to="/auth/register">Register</Link></p>
    </div>
  </div>
</div>
  );
};

export default Login;