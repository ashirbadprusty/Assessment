import React, { useState } from 'react'
import { message } from 'antd';
import { useAuth } from '../Contexts/AuthContexts';

const useLogin = () => {
    const {login} = useAuth();
    const [error, setError] =useState(null);
    const [loading, setLoading] = useState(null);

    const loginUser = async (values) =>{
            try {
            setError(null);
            setLoading(true);
            const res = await fetch('https://assessment-backend-myde.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await res.json();
            if(res.status === 200){
                message.success("User logged in successfully");
                login(data.token, data);
            } else if(res.status === 404){
                setError(data.message);
                
            } else {
                message.error('Registration failed!')
            }
        } catch (error) {
            message.error(error);
        } finally {
            setLoading(false);
        }
    };
  return {loading, error, loginUser};

}

export default useLogin;