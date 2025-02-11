import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateCover = yup.object().shape({
  banner: yup.mixed<FileList | string>().required("Please input cover"),
});

const useCoverTab = () => {
  const {
    handleUploadFile,
    isPendingMutateUploadFile,
    handleDeleteFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const {
    control: controlUpdateCover,
    handleSubmit: handleSubmitUpdateCover,
    formState: { errors: errorsUpdateCover },
    reset: resetUpdateCover,
    watch: watchUpdateCover,
    getValues: getValuesUpdateCover,
    setValue: setValueUpdateCover,
  } = useForm({
    resolver: yupResolver(schemaUpdateCover),
  });

  const preview = watchUpdateCover("banner");
  const fileUrl = getValuesUpdateCover("banner");

  const handleUploadCover = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValueUpdateCover("banner", fileUrl);
      }
    });
  };

  const handleDeleteCover = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  return {
    handleDeleteCover,
    handleUploadCover,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdateCover,
    errorsUpdateCover,
    handleSubmitUpdateCover,
    resetUpdateCover,

    preview,
  };
};

export default useCoverTab;
