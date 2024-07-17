import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
//dispatch the 'action'& get user data from store
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import { toast } from 'react-toastify';
import Loader from '../components/Loader.jsx';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
  
  //userInfo is from authSlice=>permition to register
    const { userInfo } = useSelector((state) => state.auth);
  //myregister within usersApiSlice called ' register(custom hook)
  // within userApiSlice
  const [register, {isLoading}] = useRegisterMutation();
  //permition to register
  useEffect(()=>{
    if(userInfo) {//navigate=useNavigate()
      navigate('/'); //to HomeScreen
    }
  }, [navigate,userInfo]);
// register(userApiSlice) with setCredentials(authSlice)

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('RegisterScreenjsx; submitHandler()');
        if(password !== confirmPassword) {
          toast.error('passwords do not match');
        } else {
          try {
            const res=await register({name,email,password}).unwrap();
            dispatch(setCredentials({...res}));
            navigate('/');
          } catch (err) {
            const varerror= await err?.data?.message || err.error;
            console.log(varerror);
            toast.error(varerror);
            alert(`it is alertbox;submit Error:${varerror}`);
          }
        }
       
    };
    return (
      <FormContainer>
        <h1>Sign Up</h1>

        <Form onSubmit={submitHandler} >
            <Form.Group className='my-2' controlId='name'>
              <Stack direction="horizontal" gap={2}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Name'
                  value={name}
                  onChange={ (e) => setName(e.target.value) }
                ></Form.Control>
              </Stack>
            </Form.Group>
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
            <Form.Group className='my-2' controlId='confirmPassword' >
              <Stack direction="horizontal" gap={2}>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                  type='password'
                  placeholder='confirm Password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Stack>
            </Form.Group>
            {isLoading && <Loader />}
            <Button type='submit' variant='primary' className='mt-3' >
                Sign Up
            </Button>
            <Row className='py-3' >
              <Col >
                Already have an account? <Link to='/login'>Login</Link>
              </Col>
            </Row>
        </Form>
      </FormContainer>
    );
};
export default RegisterScreen;