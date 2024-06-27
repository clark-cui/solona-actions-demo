import Image from "next/image";

export default function Home() {
  return (
    <main>
      <h1>Memo Page</h1>
      <Image
        src="/pic.png"
        alt="clark cui"
        className="dark:invert"
        width={100}
        height={24}
        priority
      />
    </main>
  );
}
