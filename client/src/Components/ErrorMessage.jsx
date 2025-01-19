function ErrorMessage({ message, style = {} }) {
    if (!message) return null;

    return (
        <p style={{ color: '#972c09', fontWeight: 'bold', ...style }}>
            {message}
        </p>
    );
}

export default ErrorMessage;
