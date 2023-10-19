const Button = ({ onClick, btnText, valueBtn }) =>{
    return (
    <button onClick={ () => onClick(valueBtn)}>
        {btnText}
    </button> 
    )
}

export default Button;