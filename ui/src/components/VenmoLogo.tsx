import venmoLogo from "../assets/logo.svg"

export default function VenmoLogo() {
    return (
        <div className="w-28 h-full">
            <img className="w-fit h-full" src={venmoLogo} alt="Venmo Logo" />
        </div>
    );
}
