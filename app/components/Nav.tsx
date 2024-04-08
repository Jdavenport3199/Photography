import Link from "next/link";

export default function Nav() {
  return (
    <div className="nav">
      <Link href="/">Showcase 1</Link>
      <Link href="/showcase2">Showcase 2</Link>
    </div>
  );
}
