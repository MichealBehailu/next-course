"use client";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { useState } from "react";
//import HeavyComponent from "./components/HeavyComponent";

// import dynamic from "next/dynamic"; //is a feature from Next.js that allows you to lazy-load React components.

// const HeavyComponent = dynamic(() => import("./components/HeavyComponent"), { //this is best for large component not suitable for small component
//   ssr: false, //explicitly telling Next.js not to include this component when rendering the page on the server. or to disable pre rendering
//   loading: () => <p>Loading</p>,
// });

export default function HomeClient() {
  const [isVisible, setVisible] = useState(false);
  return (
    <main className="relative h-screen">
      {/* <h1>Hello World</h1>
      <Link href="/users">Users</Link>
      <ProductCard />
      <Image
        src="https://res.cloudinary.com/diibo0iyi/image/upload/v1761378821/hz8pmqm299sdlj9monra.jpg"
        alt="C.Ronaldo"
        fill
        className="object-cover"
        sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
        quality={100}
        priority
      /> */}
      <h1>Hello World</h1>

      {/* <button onClick={() => setVisible(!isVisible)}>Show</button>
      {isVisible && <HeavyComponent />} */}

      <button onClick={async ()=>{ //this is very useful like lodash is not bundled with our web it is requested when the user clicks the button
        const _ = (await import('lodash')).default;
        const users = [
          {name : 'c'},
          {name : 'b'},
          {name : 'a'},
        ]

        const sortedUsers = _.orderBy(users,['name'])
        console.log(sortedUsers)
      }}>Show</button>
    </main>
  );
}
