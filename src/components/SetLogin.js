import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLogin } from '../redux/dispatchActions';

function SetLogin({ history }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLogin(history))
    }, [])

    return <></>
}

export default SetLogin