import { supabase } from "../init.js";

export const createTypeExpenses = async (userID) => {
  try {
    const { data, error } = await supabase.from("type_expenses").insert({ user_id: userID });
    if (error) {
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Error creating user", err);
    throw err;
  }
};

export const createOtherIncomings = async (userID) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .insert({ user_id: userID, type_category: "incoming", name: "Outras entradas" });
    if (error) {
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Error creating user", err);
    throw err;
  }
};

export const createOtherExpenses = async (userID) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .insert({ user_id: userID, type_category: "expense", name: "Outras despesas" });
    if (error) {
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Error creating user", err);
    throw err;
  }
};

export const createOtherExpensesSubcategory = async (userID) => {
  try {
    const categoryID = await getDefaultCategoryId(userID)
    const { data, error } = await supabase
      .from("subcategories")
      .insert({ user_id: userID, name: "Outras subcategorias", category_id: categoryID });
    if (error) {
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Error creating user", err);
    throw err;
  }
};

const getDefaultCategoryId = async () => {
  try {
    const { data, error } = await supabase.from("categories").select("id").eq("name", "Outras despesas");

    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Error creating user", err);
    throw err;
  }
};

export const createOtherInvestments = async (userID) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .insert({ user_id: userID, type_category: "investment", name: "Outros investimentos" });
    if (error) {
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Error creating user", err);
    throw err;
  }
};

export const createOtherAccounts = async (userID) => {
  try {
    const { data, error } = await supabase
      .from("accounts")
      .insert({ user_id: userID, name: "Outras contas" });
    if (error) {
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Error creating user", err);
    throw err;
  }
};

export const createOtherMembers = async (userID) => {
  try {
    const { data, error } = await supabase
      .from("members")
      .insert({ user_id: userID, name: "Outros membros" });
    if (error) {
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Error creating user", err);
    throw err;
  }
};

export const createOtherCards = async (userID) => {
  try {
    const { data, error } = await supabase
      .from("cards")
      .insert({ user_id: userID, name: "Outros cartões" });
    if (error) {
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Error creating user", err);
    throw err;
  }
};
