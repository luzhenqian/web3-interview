import Image from "next/image";
import Link from "next/link";

const navItems = ["Domains", "Ranking", "Docs", "About"];

export default function Header() {
  return (
    <header className="h-20 w-full bg-white text-sm text-black">
      <div className="h-full max-w-[1520px] mx-auto px-[5.75rem] flex items-center">
        <Link href="#">
          <Image
            alt="didhub logo"
            src="/assets/images/logo.svg"
            width={112}
            height={30}
            className="mr-9"
          />
        </Link>
        <div className="flex gap-10 items-center">
          {navItems.map((item) => (
            <a href="#" key={item}>
              {item}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
