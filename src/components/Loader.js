import React from 'react';

function Loader({ isLoading = false }) {
    return (
        <>
            {
                isLoading ? 
                    <div style={{ marginTop:"80px" }} className="spinner-grow text-primary" role="status" display={isLoading}>
                        <span className="sr-only">Loading...</span>
                    </div> : ''
            }
        </>
    );
}

export default Loader;
