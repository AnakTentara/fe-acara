import { Tooltip } from "@heroui/react";
import { FiDelete, FiEye } from "react-icons/fi";

interface PropTypes {
  onClickDetail: () => void;
  onClickDelete: () => void;
}

const Actions = (props: PropTypes) => {
  const { onClickDetail, onClickDelete } = props;
  return (
    <div className="relative flex items-center gap-6">
      <Tooltip content="Details">
        <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
          <FiEye key="detail-button" onClick={onClickDetail} />
        </span>
      </Tooltip>
      <Tooltip color="danger" content="Delete">
        <span className="cursor-pointer text-lg text-danger active:opacity-50">
          <FiDelete
            key="delete-button"
            className="text-danger-500"
            onClick={onClickDelete}
          />
        </span>
      </Tooltip>
    </div>
  );
};

export default Actions;
