import { Link } from "react-router-dom";

interface AuthModalProps {
    onClose: () => void;
}

export function AuthModal({ onClose }: AuthModalProps) {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center relative animate-fade-in">
                <img src="https://cdn-icons-png.flaticon.com/512/5556/5556499.png"
                    alt="Meditation illustration"
                    className="w-45 h-45 mx-auto mb-2"
                />

                <h2 className="text-4xl font-semibold text-gray-800 uppercase">
                    UPPS
                </h2>
                <p className="text-sm text-gray-800 mb-10 mt-4">
                    ha ocurrido un error, asegurate de iniciar secion para poder comenzar
                </p>

                <div className="flex flex-col gap-3">
                    <Link to="/login"
                        className="block bg-orange-500 hover:bg-orange-600
                        text-white text-base font-medium px-6 py-2 rounded-full mx-auto transition-all"
                    >
                        Iniciar sesión
                    </Link>

                    <p className="text-xs text-gray-500 mt-2 mb-5">
                        Telepathy?{" "}
                        <button
                            onClick={onClose}
                            className="underline hover:text-gray-700 transition"
                        >
                            No, I’d rather receive an e-mail
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
