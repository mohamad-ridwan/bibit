import BlogInvestasiProvider from "./bloginvestasi";
import NavbarProvider from "./navbar";

function IndexContext({ children }) {
    return (
        <BlogInvestasiProvider>
            <NavbarProvider>
                {children}
            </NavbarProvider>
        </BlogInvestasiProvider>
    )
}

export default IndexContext