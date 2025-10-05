import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Heading } from "@radix-ui/themes";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage } from "../redux/slices/postsReducer";

export default function Pagination() {
  const { currentPage, total, limit } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  return (
    <Flex my={"4"} align={"center"} justify={"center"} gap={"3"}>
      <Button disabled={currentPage == 1} onClick={() => dispatch(prevPage())}>
        <DoubleArrowLeftIcon />
        prev
      </Button>
      <Heading>{currentPage}</Heading>
      <Button
        disabled={currentPage >= Math.ceil(total / limit)}
        onClick={() => dispatch(nextPage())}
      >
        next
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
}
