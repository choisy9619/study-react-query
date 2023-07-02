import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import axios, { type AxiosError } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { LOGIN_URL, SIGN_UP_API_URL } from '@/constants';
import { type userData } from '@/interfaces';

const defaultFormValues = {
    email: '',
    password: '',
};

function SignUp() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<userData>({
        mode: 'onChange',
        defaultValues: defaultFormValues,
    });

    const signUpMutation = useMutation(
        async (data: userData) =>
            await axios.post(`http://localhost:8080${SIGN_UP_API_URL}`, data),
        {
            onError: (error: AxiosError<{ details: string }>) => {
                window.alert(error.response?.data.details);
            },
            onSuccess: (data) => {
                navigate(LOGIN_URL);
            },
        },
    );

    const onSubmit = (data: userData) => {
        signUpMutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <StyledSignUp>
                <h2>SignUp</h2>
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
                <button type="submit">sign up</button>
                <Link to={LOGIN_URL}>Already have an account?</Link>
            </StyledSignUp>
        </form>
    );
}

export default SignUp;

const StyledSignUp = styled.div`
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
