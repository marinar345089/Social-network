import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  Flex,
  RadioCards,
  Select,
  Skeleton,
  Text,
  TextField,
} from "@radix-ui/themes";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAll,
  getAllTags,
  setSearch,
  setSort,
  setTag,
} from "../redux/slices/filterReducer";
import { getAllPosts, resetPage } from "../redux/slices/postsReducer";

export default function Filter() {
  const dispatch = useDispatch();
  const { tags, selectedSort, selectedTag, search, tagsLoading } = useSelector(
    (state) => state.filter
  );
  const skeletonsTags = [...new Array(24)].map((_, index) => (
    <Skeleton key={index} width="100%" height="36px" />
  ));
  const applyFilters = () => {
    dispatch(resetPage());
    dispatch(getAllPosts());
  };
  const clearFilters = () => {
    dispatch(clearAll());
    dispatch(resetPage());
    dispatch(getAllPosts());
  };
  useEffect(() => {
    dispatch(getAllTags());
  }, []);
  return (
    <Box width={"650px"}>
      <Card>
        <Flex direction={"column"} gap={"3"}>
          <TextField.Root
            value={search}
            onChange={(event) => dispatch(setSearch(event.target.value))}
            size={"3"}
            placeholder="Search the posts…"
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
          <Flex direction={"column"} gap={"3"}>
            <Text ml={"3"}>Sort by:</Text>
            <Select.Root
              value={selectedSort}
              onValueChange={(value) => dispatch(setSort(value))}
              size="3"
              defaultValue="all"
            >
              <Select.Trigger />
              <Select.Content>
                <Select.Item value="all">Default</Select.Item>
                <Select.Item value="title">Title</Select.Item>
                <Select.Item value="body">Body</Select.Item>
                <Select.Item value="views">Views</Select.Item>
              </Select.Content>
            </Select.Root>
          </Flex>
          <Flex direction={"column"} gap={"3"}>
            <Text ml={"3"}>Filter by:</Text>
            <RadioCards.Root
              value={selectedTag}
              onValueChange={(value) => dispatch(setTag(value))}
              size="1"
              columns={"4"}
            >
              {tagsLoading
                ? skeletonsTags
                : tags.map((tag) => (
                    <RadioCards.Item key={tag} value={tag}>
                      <Text size="1">{tag}</Text>
                    </RadioCards.Item>
                  ))}
            </RadioCards.Root>
          </Flex>
          <Button onClick={applyFilters} size={"3"} mt={"1"}>
            Apply
          </Button>
          <Button onClick={clearFilters} variant="outline" size={"3"}>
            Clear
          </Button>
        </Flex>
      </Card>
    </Box>
  );
}
