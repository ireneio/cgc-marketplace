import {
  CollectionContainer,
  CollectionRow,
  CollectionTitle,
} from './Collection.styles';

type CollectionProps = {
  title: string;
  collections: any;
};

function Collection({ title, collections }: CollectionProps) {
  return (
    <CollectionContainer>
      <CollectionTitle>{title}</CollectionTitle>
      <CollectionRow>
        {collections.map((collection: any) => (
          <div className="lg:w-1/3 p-2" key={collection.id}>
            <div className="flex relative">
              <img
                alt={collection.name}
                className="absolute inset-0 w-full h-full object-cover object-center"
                src={collection.splashSrc}
              />
              <div
                className="px-8 py-10 relative z-10 w-full bg-black transform transition duration-500
                hover:scale-110 opacity-0 hover:opacity-100 cursor-pointer shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 left-0">
                  <video
                    className="min-w-full h-full max-w-none w-full z-0 object-fit object-center"
                    autoPlay={true}
                    loop={true}
                    playsInline={true}
                    muted={true}
                  >
                    <source src={collection.videoSrc} type="video/mp4" />
                  </video>
                </div>
                <div className="h-40" />
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-lg text-gray-300 font-bold">
                  {collection.name}
                </h3>
                {collection.tags && (
                  <div className="py-1">
                    {collection.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5
                    rounded text-xs font-medium bg-purple-100 text-purple-800 mr-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {collection.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CollectionRow>
    </CollectionContainer>
  );
}

export default Collection;
