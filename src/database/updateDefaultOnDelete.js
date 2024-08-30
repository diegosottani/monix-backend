import { supabase } from "../init.js";

const tables = ["incomings", "expenses", "investments"];

export const categoryOnDefault = async (categoryID) => {
  try {
    const defaultCategories = {
      incomings: "Outras entradas",
      expenses: "Outras despesas",
      investments: "Outros investimentos",
    };

    for (const [table, defaultName] of Object.entries(defaultCategories)) {
      await updateCategoryDefault(categoryID, table, defaultName);
    }
  } catch (err) {
    console.error("Error categoryOnDefault", err);
    throw err;
  }
};

export const updateCategoryDefault = async (categoryID, table, defaultName) => {
  try {
    if (!categoryID) {
      throw new Error("O id da categoria é obrigatório");
    }

    if (table == "expenses") {
      await updateSubcategoryDefault(categoryID, null);
    }

    const defaultCategoryId = await getDefaultCategoryId(defaultName);

    if (defaultCategoryId.length === 0) {
      throw new Error(`Categoria padrão "${defaultName}" não encontrada`);
    }
    const { error } = await supabase
      .from(table)
      .update({ category_id: defaultCategoryId[0].id })
      .eq("category_id", categoryID);
      
    if (error) throw error;

  } catch (err) {
    console.error("Error updateCategoryDefault", err);
    throw err;
  }
};

export const getDefaultCategoryId = async (defaultName) => {
  try {
    const { data, error } = await supabase.from("categories").select("id").eq("name", defaultName);

    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Error getDefaultCategoryId", err);
    throw err;
  }
};

export const subcategoryOnDefault = async (categoryID, subCategoryID) => {
  try {
    await updateSubcategoryDefault(categoryID, subCategoryID);
  } catch (err) {
    console.error("Error subcategoryOnDefault", err);
    throw err;
  }
};

export const updateSubcategoryDefault = async (categoryID, subCategoryID) => {
  try {
    if (!categoryID && !subCategoryID) {
      throw new Error("O id da categoria é obrigatório");
    }

    const defaultSubcategoryId = await getDefaultSubcategoryId();
    if (defaultSubcategoryId.length === 0) {
      throw new Error(`Subcategoria padrão não encontrada`);
    }

    if (subCategoryID) {
      const { data, error } = await supabase
        .from("expenses")
        .update({ subcategory_id: defaultSubcategoryId[0].id })
        .eq("subcategory_id", subCategoryID);

      if (error) throw error;

      return data;
    } else {
      const { data, error } = await supabase
        .from("expenses")
        .update({ subcategory_id: defaultSubcategoryId[0].id })
        .eq("category_id", categoryID);

      if (error) throw error;

      return data;
    }
  } catch (err) {
    console.error("Error updateSubcategoryDefault", err);
    throw err;
  }
};

export const getDefaultSubcategoryId = async () => {
  try {
    const { data, error } = await supabase
      .from("subcategories")
      .select("id")
      .eq("name", "Outras subcategorias");

    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Error getDefaultSubcategoryId", err);
    throw err;
  }
};

export const accountOnDefault = async (accountID) => {
  try {
    const defaultAccountId = await getDefaultAccountId();

    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .update({ account_id: defaultAccountId[0].id })
        .eq("account_id", accountID);

      if (error) throw error;

      return data;
    }
  } catch (err) {
    console.error("Error accountOnDefault", err);
    throw err;
  }
};

export const getDefaultAccountId = async () => {
  try {
    const { data, error } = await supabase
      .from("accounts")
      .select("id")
      .eq("name", "Outras contas");

    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Error getDefaultAccountId", err);
    throw err;
  }
};

export const memberOnDefault = async (memberID) => {
  try {
    const defaultMemberId = await getDefaultMemberId();

    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .update({ member_id: defaultMemberId[0].id })
        .eq("member_id", memberID);

      if (error) throw error;

      return data;
    }
  } catch (err) {
    console.error("Error memberOnDefault", err);
    throw err;
  }
};

export const getDefaultMemberId = async () => {
  try {
    const { data, error } = await supabase
      .from("members")
      .select("id")
      .eq("name", "Outros membros");

    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Error getDefaultMemberId", err);
    throw err;
  }
};
