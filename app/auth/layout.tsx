const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex items-center justify-center h-full mt-32">
            {children}
        </div>
    );
};

export default AuthLayout;
