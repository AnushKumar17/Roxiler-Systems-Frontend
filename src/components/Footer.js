import React from 'react';

const Footer = () => {

    const copyToClipboard = (email) => {
        navigator.clipboard.writeText(email)
            .then(() => {
                alert('Email copied to clipboard!');
            })
            .catch((err) => {
                console.error('Failed to copy email: ', err);
            });
    };

    return (
        <footer className="bg-gray-800 text-white py-6 w-full bottom-0 left-0 ">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
                        <a href="https://github.com/AnushKumar17/Roxiler-Systems-Frontend" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                            Frontend GitHub
                        </a>
                        <a href="https://github.com/AnushKumar17/Roxiler-Systems-Backend" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                            Backend GitHub
                        </a>
                        <a href="https://roxiler-systems-frontend-seven.vercel.app/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                            Frontend Deployment
                        </a>
                        <a href="https://app-backend-liard.vercel.app/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                            Backend Deployment
                        </a>
                    </div>
                    <p className="text-gray-400 mt-4 md:mt-0 text-center md:text-left">
                        Anush Kumar ( <button 
                        onClick={() => copyToClipboard('21cs3007@rgipt.ac.in')}
                        className="text-gray-400 mt-4 md:mt-0 text-center md:text-left hover:underline focus:outline-none"
                    >
                        21cs3007@rgipt.ac.in
                    </button> )
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
