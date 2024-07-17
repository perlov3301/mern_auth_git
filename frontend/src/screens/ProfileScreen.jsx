import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
//dispatch the 'action'& get user data from store
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice.js';
import { toast } from 'react-toastify';
import Loader from '../components/Loader.jsx';

import { useUpdateUserMutation } from '../slices/usersApiSlice.js';
const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
  
  //userInfo is from authSlice=>permition to register
    const { userInfo } = useSelector((state) => state.auth);
    const [updateProfile, { isLoading }] = useUpdateUserMutation();
  //permition to register
  useEffect(()=>{
      setName(userInfo.name);
      setEmail(userInfo.email);
  }, [userInfo.setName, userInfo.setEmail]);
// register(userApiSlice) with setCredentials(authSlice)

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('RegisterScreenjsx; submitHandler()');
        if(password !== confirmPassword) {
          toast.error('passwords do not match');
        } else {
          console.log('ProfileScreenjsx;submit');
          try {
            const res = await updateProfile({
              _id: userInfo._id,
              name,
              email,
              password,
            }).unwrap();
            dispatch(setCredentials({...res}));
            toast.success('Profile updated');
          } catch (err) {
            const aerr = await err?.data?.message || err.error;
            toast.error(aerr);
            alert(aerr);
          }
        }
       
    };
    return (
      <FormContainer>
        <h1>Update Profile</h1>

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
              Update
            </Button>
        </Form>
      </FormContainer>
    );
};
export default ProfileScreen;