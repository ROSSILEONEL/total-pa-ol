import netbooksData from "../data/netbooks.json";
import NetbookCard from "../components/Netbooks";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-1">
      <h1 className="text-1xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text font-bold mb-4">Listado de Netbooks</h1>
      <div className="grid m-0 grid-cols-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-15 gap-1">
        {netbooksData.netbooks.map((netbook) => (
          <NetbookCard key={netbook.id} netbook={netbook} />
        ))}
      </div>
    </main>
  );
}
