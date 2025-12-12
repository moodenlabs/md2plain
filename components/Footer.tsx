export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 right-0 z-50 py-4 text-center pointer-events-none">
            <p className="text-xs text-gray-500 mix-blend-difference">
                © {new Date().getFullYear()} MD2Plain. All rights reserved.
            </p>
        </footer>
    );
}
