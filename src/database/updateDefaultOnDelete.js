import { supabase } from "../init.js";

const tables = ["incomings", "expenses", "investments"];

export const categoryOnDefault = async (categoryID, userId) => {
  try {
    const defaultCategories = {
      incomings: "Outras entradas",
      expenses: "Outras despesas",
      investments: "Outros investimentos",
    };

    for (const [table, defaultName] of Object.entries(defaultCategories)) {
      await updateCategoryDefault(categoryID, table, defaultName, userId);
    }
  } catch (err) {
    console.error("Error categoryOnDefault", err);
    throw err;
  }
};

const updateCategoryDefault = async (categoryID, table, defaultName, userId) => {
  try {
    if (!categoryID) {
      throw new Error("O id da categoria é obrigatório");
    }

    const defaultCategoryId = await getDefaultCategoryId(defaultName, userId);
    if (table == "expenses") {
      await updateSubcategoryDefault(categoryID, defaultCategoryId);
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

const getDefaultCategoryId = async (defaultName, userId) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("id")
      .eq("name", defaultName)
      .eq("user_id", userId);

    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Error getDefaultCategoryId", err);
    throw err;
  }
};

export const subcategoryOnDefault = async (subCategoryID, userId) => {
  try {
    const getCategory = await getCategoryId(subCategoryID);
    const categoryID = getCategory[0].category_id;
    const defaultCategoryId = await getDefaultCategoryId("Outras despesas", userId);
    await updateSubcategoryDefault(categoryID, defaultCategoryId);
  } catch (err) {
    console.error("Error subcategoryOnDefault", err);
    throw err;
  }
};

const getCategoryId = async (subCategoryID) => {
  try {
    const { data, error } = await supabase
      .from("subcategories")
      .select("category_id")
      .eq("id", subCategoryID);

    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Error getCategoryId", err);
    throw err;
  }
};

const updateSubcategoryDefault = async (categoryID, defaultCategoryId) => {
  try {
    if (!categoryID) {
      throw new Error("O id da categoria é obrigatório");
    }

    const defaultSubcategoryId = await getDefaultSubcategoryId(defaultCategoryId);
    const { data, error } = await supabase
      .from("expenses")
      .update({ subcategory_id: defaultSubcategoryId[0].id })
      .eq("category_id", categoryID);

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error updateSubcategoryDefault", err);
    throw err;
  }
};

const getDefaultSubcategoryId = async (defaultCategoryId) => {
  try {
    const { data, error } = await supabase
      .from("subcategories")
      .select("id")
      .eq("name", "Outras subcategorias")
      .eq("category_id", defaultCategoryId);

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

const getDefaultAccountId = async () => {
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

const getDefaultMemberId = async () => {
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

export const cardOnDefault = async (cardID) => {
  try {
    const defaultCardId = await getDefaultCardId();

    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .update({ card_id: defaultCardId[0].id })
        .eq("card_id", cardID);

      if (error) throw error;

      return data;
    }
  } catch (err) {
    console.error("Error cardOnDefault", err);
    throw err;
  }
};

const getDefaultCardId = async () => {
  try {
    const { data, error } = await supabase
      .from("cards")
      .select("id")
      .eq("name", "Outros cartões");

    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Error getDefaultCardId", err);
    throw err;
  }
};