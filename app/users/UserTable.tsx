
import { sort } from "fast-sort";
import Link from "next/link";

interface User {
  //the shape of user object
  id: number;
  name: string;
  email:string;   
}

interface Props{
  sortOrder:string;
}

const UserTable = async ({sortOrder}:Props) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });

  const users: User[] = await res.json()   //annotate it with User array

  const sortedUsers = sort(users).asc(sortOrder === 'email' ? (user) => user.email : (user) => user.name)


  
  return (
    <>
      <table className="table table-bordered">
        <thead>
          <th>
            <Link href="/users?sortOrder=name">Name</Link>
          </th>
          <th>
            <Link href="/users?sortOrder=email">Email</Link>
          </th>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
      <ul></ul>
    </>
  );
};

export default UserTable;

/** 
   const res =  await fetch('https://jsonplaceholder.typicode.com/users',{cache: 'no store'}) here we are disabling the automatically caching by next js
   const res =  await fetch('https://jsonplaceholder.typicode.com/users',{next: {revalidate:10}}) so here next js will auctomatically refresh data every 10 second
 * 
   we used Link in line 32 and 35 because on server side we pass states using query search not useState...can;t be useState because it client side
 */
