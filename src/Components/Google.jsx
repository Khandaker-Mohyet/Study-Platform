import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import UseAxiosPublic from '../Hooks/UseAxiosPublic';

const Google = () => {
  const { googleSignIn } = useContext(AuthContext)
  const axiosPublic = UseAxiosPublic()
  const navigate = useNavigate()

  const handelGoogleSignIn = () => {
    googleSignIn()
      .then(result => {
        console.log(result.user);
        const userInfo = {
          email: result.user?.email,
          displayName: result.user?.displayName,
          photoURL: result.user?.photoURL,
          role: 'Student'
        }
        axiosPublic.post('/users', userInfo)
          .then(res => {
            console.log(res.data)
            navigate('/')
        })
    })
  }
  return (
    <p className="text-center my-4">
            <button onClick={handelGoogleSignIn} className='btn btn-outline btn-success'>Google login</button>
            </p>
  );
};

export default Google;