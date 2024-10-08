import { supabase } from "../init.js";

const tables = ["incomings", "expenses", "investments"];

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
    const { data, error } = await supabase.from("cards").select("id").eq("name", "Outros cartões");

    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Error getDefaultCardId", err);
    throw err;
  }
};
