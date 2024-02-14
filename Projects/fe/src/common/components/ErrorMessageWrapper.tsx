interface ErrorMessageWrapperProps {
    children?: string;
}
const ErrorMessageWrapper: React.Fc<ErrorMessageWrapperProps> = ({
    children
}) => {
    return (
        <div className="text-center text-red-500">{children}</div>
    )
}

export default ErrorMessageWrapper