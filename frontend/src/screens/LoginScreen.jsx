import { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
// dispatch the 'action' & get user data from store
import {useDispatch, useSelector}  from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice.js';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader.jsx';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
//mylogin within usersApiSlice called 'login'(custom hook)
    // within usersApiSlice
    const [login, {isLoading}] = useLoginMutation();
    // userInfo is from authSlice=>permition to login
    const  { userInfo } = useSelector((state) => state.auth);
    // permition to login
    useEffect(()=>{
      if(userInfo) {// navigate=useNavigate() 
        navigate('/'); // to HomeScreen
      }
    },[navigate,userInfo]);
// login(usersApiSlice) with setCredentials(authSlice)
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('LoginScreenjsx; submitHandler()');
        try {
//data from form;'await' unwraps a promise; in redux-toolkit 
//unwrap() will resolve to the value of fulfilled
//action or throw on a rejected action
    const res = await login({ email, password }).unwrap();
// we call to the backend; response to be put into res
//... allows to accept an indefined number of arguments
// we put user to the localStorage
    dispatch(setCredentials({...res}));
console.log(`loginScreenjs;
    localStorage: ${localStorage.getItem('userInfo')}`);
alert('loginscreenjs;alertbox;setCredentials()');
    navigate('/');
        } catch (err) {
          alert(`LoginScreenjsx;submitHandler(): Error`);
// ? allows to treat an argument that is indefined
      const varerror= await err?.data?.message || err.error;
      
      console.log(varerror);
      toast.error(varerror);
        }
    };
    return (
        <FormContainer>
          <h1>Sign In</h1>

          <Form onSubmit={submitHandler} >
            <Form.Group className='my-2' controlId='email'>
              <Stack direction="horizontal" gap={2}>
                <Form.Label>Email Adress</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter Email'
                  value={email}
                  onChange={ (e) => setEmail(e.target.value) }
                ></Form.Control>
              </Stack>
            </Form.Group>
            <Form.Group className='my-2' controlId='password' >
              <Stack direction="horizontal" gap={2}>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type='password'
                  placeholder='Enter Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Stack>
            </Form.Group>

            { isLoading && <Loader /> }

            <Button type='submit' variant='primary' className='mt-3' >
                Sign In
            </Button>
            <Row className='py-3' >
              <Col >
                New Customer? <Link to='/register'>Register</Link>
              </Col>
            </Row>
          </Form>
        </FormContainer>
    );
};
export default LoginScreen;

// 2LUJX-3NFG3-N5WFB-FAX11
// SFPRIME25