interface ButtomParams {
    textColor: string;
    bgColor: string;
    text: string;
}

export default function Button({ textColor, bgColor, text }: ButtomParams) {
    return (
        <button className={`w-full border-blue-700 border mb-1  rounded-full py-2 ${textColor} ${bgColor} cursor-pointer text-lg`}>{text}</button>
    );
}
