import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Input,
  Textarea,
  ModalFooter,
  Button,
  Spinner,
} from "@heroui/react";
import useAddCategoryModal from "./useAddCategoryModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchCategory: () => void;
}

const AddCategoryModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchCategory } = props;
  const {
    control,
    errors,
    handleSubmitForm,
    handleAddCategory,
    isPendingMutateAddCategory,
    isSuccessMutateAddCategory,
    handleUploadIcon,
    isPendingMutateUploadFile,
    preview,
    handleDeleteIcon,
    isPendingMutateDeleteFile,
    handleOnClose,
  } = useAddCategoryModal();

  useEffect(() => {
    if (isSuccessMutateAddCategory) {
      onClose();
      refetchCategory();
    }
  }, [isSuccessMutateAddCategory]);

  const disabledSubmit =
  isPendingMutateAddCategory || isPendingMutateUploadFile || isPendingMutateDeleteFile;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      backdrop="opaque"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddCategory)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Category</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Information</p>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    autoFocus
                    label="Name"
                    variant="bordered"
                    isInvalid={errors.name !== undefined}
                    errorMessage={errors.name?.message}
                    className="mb-2"
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Description"
                    variant="bordered"
                    isInvalid={errors.description !== undefined}
                    errorMessage={errors.description?.message}
                    className="mb-2"
                  />
                )}
              />
              <p className="text-sm font-bold">Icon</p>
              <Controller
                name="icon"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onDelete={() => handleDeleteIcon(onChange)}
                    onUpload={(files) => handleUploadIcon(files, onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDeleteFile}
                    preview={typeof preview === 'string' ? preview : ""}
                    isInvalid={errors.icon !== undefined}
                    errorMessage={errors.icon?.message}
                    isDropable
                    label=""
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => handleOnClose(onClose)}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              type="submit"
              disabled={disabledSubmit}
            >
              {isPendingMutateAddCategory || isPendingMutateUploadFile ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Category"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddCategoryModal;
