import { CollectionInfo } from '@/pages/launchpad/[id]';
import Tag from '../Shared/Tag';

const IdoPanel = ({ info }: { info: CollectionInfo }) => {
  return (
    <Tag className="mt-[30px] px-[28px] py-[24px]">
      <div>IdoPanel</div>
    </Tag>
  );
};

export default IdoPanel;
