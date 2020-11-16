import React from 'react';

function Loader({ isLoading = false }) {

    const loadingProps = {
        style: { marginTop:"80px" }, 
        className: 'spinner-grow text-primary',
        role: 'status',
        display: isLoading
    }

    return (
        <>
            {
                isLoading ? 
                    <div {...loadingProps}>
                        <span className="sr-only">Loading...</span>
                    </div> : ''
            }
        </>
    );
}

export default Loader;
