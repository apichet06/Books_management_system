import categoryService from "@/features/category/services/categoryService";
import type { CategoryDropdown } from "@/features/category/types/category";
import { useCallback, useEffect, useState } from "react";

export default function useCategoryDropdownList() {
  const [categoryDropdown, setCategoryDropdown] = useState<CategoryDropdown[]>(
    []
  );

  const handleGetDropdown = useCallback(async () => {
    try {
      const res = await categoryService.getBookDropdonwList();
      console.log(res);
      setCategoryDropdown(res);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    handleGetDropdown();
  }, [handleGetDropdown]);

  return {
    categoryDropdown,
    refetch: () => handleGetDropdown(),
  };
}
