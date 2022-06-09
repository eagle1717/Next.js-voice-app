import Navbar from "../components/Navbar";

export default function DefaultLayout({ children }) {
    return (
        <>
            <Navbar />
            <main className="mt-4">{children}</main>
        </>
    );
}
