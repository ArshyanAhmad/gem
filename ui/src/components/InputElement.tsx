interface InputParams {
    type: string;
    placeholder: string;
    appearance?: string;
}

export default function InputElement({ type, placeholder, appearance }: InputParams) {
    return (
        <input type={type} className={`rounded-full border border-slate-300 pl-6 w-full text-gray-500  outline-0  h-11 ${appearance}`} placeholder={placeholder} />
    )
}
