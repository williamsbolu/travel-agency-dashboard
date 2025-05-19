import { Header } from "components";

const AllUsers = () => {
  const user = { name: "Adrian" };

  return (
    <main className="dashboard wrapper">
      <Header
        title="Trips page"
        description="Check out our current users in real time"
      />
      All users content
    </main>
  );
};

export default AllUsers;
