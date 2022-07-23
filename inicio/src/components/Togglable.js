import React from 'react';
import { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';

// const Togglable = forwardRef(({ children, buttonLabel = 'Accept' }, ref) => {
const Togglable = forwardRef(({ children, buttonLabel }, ref) => {

    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible);
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div className='border p-2'>

            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}> {buttonLabel} </button>
            </div>

            <div style={showWhenVisible}>
                {children}
                <button className='mt-2' onClick={toggleVisibility}> Cancel</button>

            </div>

        </div>

    );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable;