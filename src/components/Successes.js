import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearSuccess } from '../redux/dispatchActions';

function Successes() {
    const successMessage = useSelector(state => state.successMessage)
    const dispatch = useDispatch();

    useEffect(() => () => dispatch(clearSuccess()), [dispatch])

    return <div className="successes">
        <span className='nes-text is-success'>{successMessage}</span>
    </div>
}

export default Successes
