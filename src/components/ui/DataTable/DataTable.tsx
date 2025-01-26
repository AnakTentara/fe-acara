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
import { ChangeEvent, Key, ReactNode, useMemo } from "react";
import { CiSearch } from "react-icons/ci";
import { LIMIT_LISTS } from "@/constants/list.constants";
import { cn } from "@/utils/cn";

interface PropTypes {
  buttonTopContentLabel?: string;
  columns: Record<string, unknown>[];
  currentPage: number;
  data: Record<string, unknown>[];
  emptyContent: string;
  isLoading?: boolean;
  limit: string;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeLimit: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChangePage: (page: number) => void;
  onClearSearch: () => void;
  onClickButtonTopContent?: () => void;
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
  totalPages: number;
}

const DataTable = (props: PropTypes) => {

  const {
    buttonTopContentLabel,
    columns,
    currentPage,
    data,
    emptyContent,
    isLoading,
    limit,
    onChangeSearch,
    onChangeLimit,
    onChangePage,
    onClearSearch,
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
          onClear={onClearSearch}
          onChange={onChangeSearch}
        />
        {buttonTopContentLabel && (
          <Button
            color="danger"
            onPress={onClickButtonTopContent}
          >
            {buttonTopContentLabel}
          </Button>
        )}
      </div>
    );
  }, [
    buttonTopContentLabel,
    onChangeSearch,
    onClearSearch,
    onClickButtonTopContent,
  ]);

  const BottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center py-2 lg:justify-between">
        <Select
          className="hidden max-w-36 rounded-xl bg-white lg:block"
          variant="bordered"
          size="md"
          selectedKeys={[limit]}
          selectionMode="single"
          onChange={onChangeLimit}
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
            page={currentPage}
            total={totalPages}
            onChange={onChangePage}
          />
        )}
      </div>
    );
  }, [limit, currentPage, totalPages, onChangeLimit, onChangePage]);

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
