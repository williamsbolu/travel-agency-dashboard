import { Header } from "components";

const trips = () => {
  return (
    <main className="all-users wrapper">
      <Header
        title="Trips"
        description="View and edit AI-generated travel plans"
        ctaText="Create a Trip"
        ctaUrl="/trips/create"
      />
    </main>
  );
};

export default trips;
