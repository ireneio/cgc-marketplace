import ListingHintDialog from '@/components/Nft/ListingHintDialog';
import { useState } from 'react';

const Test = () => {
  const [dialogOpen, setDialogOpen] = useState(true);

  return (
    <div id="Test">
      <ListingHintDialog isOpen={dialogOpen} setIsOpen={setDialogOpen} />
    </div>
  );
};

export default Test;
