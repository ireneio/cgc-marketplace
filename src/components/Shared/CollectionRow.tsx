import React from 'react';

interface CollectionRowProps {
  heading: string;
  collections: any;
}

const CollectionRow: React.FC<CollectionRowProps> = ({
  heading,
  collections,
}): JSX.Element => {
  return (
    <div className="mx-auto pt-12 px-4 sm:px-6 lg:max-w-8xl lg:px-8 w-full">
      <h2 className="text-2xl font-extrabold font-circularstdbold tracking-tight text-white">
        {heading}
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-1 lg:grid-cols-3 xl:gap-x-8">
        {collections.map((collection: any) => (
          <div key={collection.id} className="group relative">
            <div
              className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden
              group-hover:opacity-75 lg:hover:scale-110 transform transition duration-500 lg:h-80 lg:aspect-none
              hover:cursor-pointer"
            >
              <img
                src={collection.splashSrc}
                alt={collection.name}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionRow;
