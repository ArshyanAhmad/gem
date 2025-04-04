import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Transfer() {
    return (
        <div>
            <Header />
            <main className="grid grid-cols-6">
                <aside>
                    <Sidebar />
                </aside>
                <section className="bg-gray-200/30  col-span-5"></section>
            </main>
        </div>
    );
}
