import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";


interface Props {
    color: 'dark' | 'light';
    translations: Record<string, string>;
}

export default function Contacts({ color, translations }: Props) {
    
    
    return (
       <div>
            <h1 className={`text-3xl font-bold ${color === 'dark' ? 'text-white' : 'text-blue-800'}`}>
            {translations.name}
            </h1>
            <div className="mt-2 flex items-center gap-4 text-gray-600">
            <a href="mailto:anna.serba@gmail.com" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                <FaEnvelope className={`text-sm ${color === 'dark' ? 'text-white' : 'text-blue-800'}`} />
                <span className={`text-sm ${color === 'dark' ? 'text-white' : 'text-blue-800'}`}>anna.serba@gmail.com</span>
            </a>
            <a href="https://github.com/annaserba" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                <FaGithub className={`text-sm ${color === 'dark' ? 'text-white' : 'text-blue-800'}`} />
                <span className={`text-sm hidden md:inline ${color === 'dark' ? 'text-white' : 'text-blue-800'}`}>github.com/annaserba</span>
            </a>
            <a href="https://linkedin.com/in/annaserba" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                <FaLinkedin className={`text-sm ${color === 'dark' ? 'text-white' : 'text-blue-800'}`} />
                <span className={`text-sm hidden md:inline ${color === 'dark' ? 'text-white' : 'text-blue-800'}`}>linkedin.com/in/annaserba</span>
            </a>
            </div>
        </div>
    );
}