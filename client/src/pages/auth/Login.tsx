import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import axios, { type AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { LOGIN_API_URL, MAIN_URL, SIGN_UP_URL, TOKEN } from '@/constants';
import { type userData } from '@/interfaces';

const defaultFormValues = {
    email: '',
    password: '',
};

function Login() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<userData>({
        mode: 'onChange',
        defaultValues: defaultFormValues,
    });

    useEffect(() => {
        if (!(localStorage.getItem(TOKEN) == null)) {
            navigate(MAIN_URL);
        }
    }, []);

    const loginMutation = useMutation(
        async (data) =>
            await axios.post(`http://localhost:8080${LOGIN_API_URL}`, data),
        {
            onMutate: (variable: userData) => {
                console.log('onMutate', variable);
            },
            onError: (error: AxiosError<{ details: string }>) => {
                window.alert(error.response?.data.details);
            },
            onSuccess: (data) => {
                localStorage.setItem(TOKEN, data?.data.token);
                navigate(MAIN_URL);
            },
        },
    );

    const onSubmit = (data: userData) => {
        loginMutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <StyledLogin>
                <h2>Login</h2>
                <InputField>
                    <label htmlFor="email">email</label>
                    <input
                        type="email"
                        placeholder="test@email.com"
                        {...register('email', {
                            required: 'required',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'not valid email',
                            },
                        })}
                    />
                    <span>{errors?.email?.message}</span>
                </InputField>
                <InputField>
                    <label htmlFor="password">password</label>
                    <input
                        type="password"
                        placeholder="********"
                        {...register('password', {
                            required: 'required',
                            minLength: {
                                value: 8,
                                message: 'min length is 8',
                            },
                        })}
                    />
                    <span>{errors?.password?.message}</span>
                </InputField>
                <button type="submit" disabled={loginMutation.isLoading}>
                    {loginMutation.isLoading ? 'ing..' : 'login'}
                </button>
                <Link to={SIGN_UP_URL}>
                    New User? Please create account here
                </Link>
            </StyledLogin>
        </form>
    );
}

export default Login;

const StyledLogin = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: fit-content;
    margin: 0 auto;
`;

const InputField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;

    > span {
        color: red;
    }
`;
