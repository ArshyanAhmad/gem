interface ButtomParams {
    textColor: string;
    bgColor: string;
    text: string;
    onClick?: () => void;
}

export default function Button({ textColor, bgColor, text, onClick }: ButtomParams) {
    return (
        <button onClick={onClick} className={`w-full border-blue-700 border mb-1  rounded-full py-2 ${textColor} ${bgColor} cursor-pointer text-lg`}>{text}</button>
    );
}
