const Footer = () => {
    return (
        <footer className="w-[88%] mx-auto py-4 text-center text-sm text-gray-500 border-t-[1px] border-gray-700 mt-10">
            <p>&copy; {new Date().getFullYear()} cryptoTracker. All rights reserved.</p>
        </footer>
    );
};

export default Footer;