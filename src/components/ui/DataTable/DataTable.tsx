import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Key, ReactNode, useMemo } from "react";
import { CiSearch } from "react-icons/ci";
import { LIMIT_LISTS } from "@/constants/list.constants";
import { cn } from "@/utils/cn";
import useChangeUrl from "@/hooks/useChangeUrl";

interface PropTypes {
  buttonTopContentLabel?: string;
  columns: Record<string, unknown>[];
  data: Record<string, unknown>[];
  emptyContent: string;
  isLoading?: boolean;
  onClickButtonTopContent?: () => void;
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
  totalPages: number;
}

const DataTable = (props: PropTypes) => {
  const {
    currentLimit,
    currentPage,
    handleChangeLimit,
    handleChangePage,
    handleSearch,
    handleClearSearch,
  } = useChangeUrl();
  const {
    buttonTopContentLabel,
    columns,
    data,
    emptyContent,
    isLoading,
    onClickButtonTopContent,
    renderCell,
    totalPages,
  } = props;

  const TopContent = useMemo(() => {
    return (
      <div className="flox-col-reverse flex items-start justify-between gap-y-4 lg:flex-row lg:items-center">
        <Input
          isClearable
          color="default"
          variant="bordered"
          className="w-full rounded-xl bg-white sm:max-w-[24%]"
          placeholder="Search by Name"
          startContent={<CiSearch />}
          onClear={handleClearSearch}
          onChange={handleSearch}
        />
        {buttonTopContentLabel && (
          <Button color="danger" onPress={onClickButtonTopContent}>
            {buttonTopContentLabel}
          </Button>
        )}
      </div>
    );
  }, [
    buttonTopContentLabel,
    handleClearSearch,
    handleSearch,
    onClickButtonTopContent,
  ]);

  const BottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center py-2 lg:justify-between">
        <Select
          className="hidden max-w-36 rounded-xl bg-white lg:block"
          variant="bordered"
          size="md"
          selectedKeys={[`${currentLimit}`]}
          selectionMode="single"
          onChange={handleChangeLimit}
          startContent={<p className="text-small">Show:</p>}
          disallowEmptySelection
        >
          {LIMIT_LISTS.map((item) => (
            <SelectItem
              variant="bordered"
              className="rounded-xl bg-white"
              key={item.value}
              value={item.value}
            >
              {item.label}
            </SelectItem>
          ))}
        </Select>
        {totalPages > 1 && (
          <Pagination
            className="rounded-xl"
            isCompact
            showControls
            variant="faded"
            color="danger"
            page={Number(currentPage)}
            total={totalPages}
            onChange={handleChangePage}
          />
        )}
      </div>
    );
  }, [
    currentLimit,
    currentPage,
    totalPages,
    handleChangeLimit,
    handleChangePage,
  ]);

  return (
    <Table
      classNames={{
        base: "max-w-full",
        wrapper: cn({ "overflow-x-hidden": isLoading }),
      }}
      topContent={TopContent}
      topContentPlacement="outside"
      bottomContent={BottomContent}
      bottomContentPlacement="outside"
      defaultSelectedKeys={["2"]}
      selectionMode="single"
      color="default"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid as Key}>
            {column.name as string}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        emptyContent={emptyContent}
        items={data}
        isLoading={isLoading}
        loadingContent={
          <div className="flex h-full w-full items-center justify-center bg-foreground-700/30 backdrop-blur-sm">
            <Spinner color="danger" />
          </div>
        }
      >
        {(item) => (
          <TableRow key={item._id as Key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
