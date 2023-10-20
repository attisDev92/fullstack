
const Button = ({ nameBtn, type, onClick}) => {
    return (
        <button 
            type={type} 
            onClick={onClick}>
            {nameBtn}
        </button>
    );
}

export default Button;