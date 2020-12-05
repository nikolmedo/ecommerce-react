import React from 'react';
import { Link } from 'react-router-dom';

function NotFound({ error = "No encontrado"}) {
    return (
        <>
            {/* <div className="card"> */}
                {/* <div className="card-body"> */}
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="text-center text-muted">{error}</h3>
                            <Link to={'/'}><button className="btn btn-success">Volver a la home</button></Link>
                        </div>
                    </div>
                {/* </div> */}
            {/* </div> */}
        </>
    );
}

export default NotFound;