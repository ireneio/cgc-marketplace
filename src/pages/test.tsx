import ListingHintDialog from '@/components/Nft/ListingHintDialog';
import { useState } from 'react';

const Test = () => {
  const [listingHintDialog, setListingHintDialog] = useState(true);

  return (
    <div id="Test">
      <button onClick={() => setListingHintDialog((prev) => !prev)}>
        open ListingHintDialog
      </button>
      <ListingHintDialog
        isOpen={listingHintDialog}
        setIsOpen={setListingHintDialog}
      />
    </div>
  );
};

export default Test;
