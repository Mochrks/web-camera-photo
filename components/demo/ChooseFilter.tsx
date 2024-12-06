import React from "react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export interface FilterData {
    id: number;
    name: string;
    adjustments: {
        brightness: number;
        contrast: number;
        saturation: number;
        whites: number;
        blacks: number;
        sharpness: number;
        hue: number;
    };
}

export interface Artwork {
    id: number;
    nameFilter: string;
    images: string;
}

const DEFAULT_IMAGE =
    "https://photoshopdesire.com/wp-content/uploads/2018/10/Before-How-to-Get-Dark-and-Moody-Tones-Color-Effect-in-Photoshop.jpg";

export const ChooseFilter = () => {
    const [works, setWorks] = React.useState<Artwork[]>([]);

    // Load filters and transform them to Artwork format
    React.useEffect(() => {
        const storedFilters = localStorage.getItem("filters");
        if (storedFilters) {
            try {
                const parsedFilters: FilterData[] = JSON.parse(storedFilters);

                // Transform filters for rendering
                const artworkFilters: Artwork[] = parsedFilters.map((filter) => ({
                    id: filter.id,
                    nameFilter: filter.name,
                    images: DEFAULT_IMAGE,
                }));

                setWorks(artworkFilters);
            } catch (error) {
                console.error("Error parsing filters from localStorage", error);
                setWorks([]);
            }
        }
    }, []);

    // Handle filter click
    const handleFilterClick = (id: number) => {
        const storedFilters = localStorage.getItem("filters");
        if (storedFilters) {
            try {
                const parsedFilters: FilterData[] = JSON.parse(storedFilters);

                // Find the selected filter by ID
                const selectedFilter = parsedFilters.find((filter) => filter.id === id);

                if (selectedFilter) {
                    // Set the selected filter in localStorage
                    localStorage.setItem("selectedFilter", JSON.stringify(selectedFilter));
                    console.log("Selected filter updated:", selectedFilter);
                }
            } catch (error) {
                console.error("Error setting selected filter", error);
            }
        }
    };

    return (
        <div>
            <div className="flex flex-col w-full z-50">
                <h5 className="text-center text-black text-md font-bold">Filters</h5>
                <ScrollArea className="w-full h-40 md:h-[520px] whitespace-nowrap mt-4">
                    <div className="flex flex-col w-max bg-gray-600">
                        {works.map((artwork) => (
                            <figure
                                key={artwork.id}
                                className="shrink-0 w-20 flex flex-col items-center py-2"
                                onClick={() => handleFilterClick(artwork.id)} // Add click handler
                            >
                                <div className="overflow-hidden rounded-md flex justify-center cursor-pointer p-1 border-0 hover:bg-white">
                                    <Image
                                        src={artwork.images}
                                        alt={`Photo by ${artwork.nameFilter}`}
                                        className="aspect-[3/4] h-fit w-fit object-cover rounded-md"
                                        width={40}
                                        height={50}
                                        sizes="(min-width: 768px) 36px, 40px"
                                    />
                                </div>
                                <figcaption className="pt-2 text-[8px] md:text-xs text-white text-center whitespace-normal break-words w-full">
                                    {artwork.nameFilter}
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    );
};
