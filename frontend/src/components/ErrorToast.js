import React from "react";
function ErrorToast(props){
    return(
        <div className="align-items-center text-white bg-danger position-absolute  end-0 p-3" style={{ zIndex: "11", top: "12px" }}>
        <div className="d-flex">
            <div className="body">
                {props.data}.
            </div>
            <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => props.setToast(false)}
                aria-label="Close"
            ></button>
        </div>
    </div>

    )
}
export default ErrorToast;