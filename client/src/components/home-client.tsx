"use client";

export default function HomeClient() {
  return (
    <div className="home-container text-center min-h-[calc(100vh-60px)] overflow-auto relative pt-[60px]">
      <div className="container mx-auto">
        <div className="graf-bg-container w-full h-[310px] overflow-hidden perspective-[2000px] opacity-70">
          <div className="graf-layout h-full mx-auto relative perspective-[2000px]">
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i} className={`graf-circle graf-circle-${i + 1}`} />
            ))}
          </div>
        </div>
        <h1 className="home-title text-2xl font-normal text-gray-700 mt-[50px]">
          Rateio
        </h1>
      </div>
    </div>
  );
}
