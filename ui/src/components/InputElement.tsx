
interface InputParams {
    type: string;
    placeholder: string;
    appearance?: string;
    value?: string | number;
    setter?: (value: string) => void;
}

export default function InputElement({ value, type, placeholder, appearance, setter }: InputParams) {
    return (
        <input value={value} onChange={(e) => setter && setter(e.target.value)} type={type} className={`rounded-full border border-slate-300 pl-6 w-full text-gray-500  outline-0  h-11 ${appearance}`} placeholder={placeholder} />
    )
}
