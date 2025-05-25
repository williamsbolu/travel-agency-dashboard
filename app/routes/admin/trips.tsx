import { useSearchParams, type LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/trips";
import { Header, TripCard } from "components";
import { getAllTrips } from "~/appwrite/trips";
import { parseTripData } from "lib/utils";
import { useState } from "react";
import { PagerComponent } from "@syncfusion/ej2-react-grids";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const limit = 8;
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);

  const offset = (page - 1) * limit;

  const { allTrips, total } = await getAllTrips(limit, offset);

  return {
    trips: allTrips.map(({ $id, tripDetail, imageUrls }) => ({
      id: $id,
      ...parseTripData(tripDetail),
      imageUrls: imageUrls ?? [],
    })),
    total,
  };
};

const trips = ({ loaderData }: Route.ComponentProps) => {
  const trip = loaderData?.trips as Trip[] | [];

  const [searchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page") || "1");
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.location.search = `?page=${page}`; // Updates the search params on the url:
  };

  console.log(loaderData.total);

  return (
    <main className="all-users wrapper">
      <Header
        title="Trips"
        description="View and edit AI-generated travel plans"
        ctaText="Create a Trip"
        ctaUrl="/trips/create"
      />

      <section>
        <h1 className="p-24-semibold text-dark-100 mb-4">
          Manage Created Trips
        </h1>

        <div className="trip-grid mb-4">
          {trip.map(
            ({
              id,
              name,
              imageUrls,
              itinerary,
              interests,
              travelStyle,
              estimatedPrice,
            }) => (
              <TripCard
                key={id}
                id={id}
                name={name}
                imageUrl={imageUrls[0]}
                location={itinerary?.[0].location ?? ""}
                price={estimatedPrice}
                tags={[interests, travelStyle]}
              />
            )
          )}
        </div>

        <PagerComponent
          totalRecordsCount={loaderData.total}
          pageSize={8}
          currentPage={currentPage}
          click={(args) => handlePageChange(args.currentPage)}
          cssClass="!mb-4"
        />
      </section>
    </main>
  );
};

export default trips;
