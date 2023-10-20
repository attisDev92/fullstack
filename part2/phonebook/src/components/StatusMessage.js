const StatusMessage = ({ text, styleStatus }) => {
    return (
        <div className={ styleStatus }>
            <p>{text}</p>
        </div>
    )
}

export default StatusMessage;