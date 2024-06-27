import React from "react";
import Image from "next/image";

const DonatePage = () => {
  return (
    <main>
      <h1>Donate Page</h1>
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
};

export default DonatePage;
