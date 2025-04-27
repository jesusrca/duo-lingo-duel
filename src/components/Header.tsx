
import { UserProfile } from "./UserProfile";

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto py-4 px-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#9b87f5]">Aprende Idiomas</h1>
        <UserProfile />
      </div>
    </header>
  );
}
