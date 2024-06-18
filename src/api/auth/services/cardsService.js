import { supabase } from "../../../init";

export const getUserCards = async (userId, active) => {
  try {
    const { data, error } = await supabase
      .from("cards")
      .select(
        `
        id,
        user_id,
        name,
        closing_day,
        due_day,
        limit      
        `
      )
      .eq("user_id", userId)
      .eq("active", active);

    if (error) throw error;
    return { data };
  } catch (error) {
    return { error };
  }
};

export const createUserCard = async (userId, cardData) => {
  try {
    const { error } = await supabase.from("cards").insert({
      user_id: userId,
      name: cardData.name,
      closing_day: cardData.closing_day,
      due_day: cardData.due_day,
      limit: cardData.limit,
      active: true,
    });

    if (error) throw error;
    return {};
  } catch (error) {
    return { error };
  }
};

export const updateUserCard = async (id, cardData) => {
  try {
    const updatedCard = {
      name: cardData.name,
      closing_day: cardData.closing_day,
      due_day: cardData.due_day,
      limit: cardData.limit,
      active: cardData.active,
    };

    const { error } = await supabase
      .from("cards")
      .update(updatedCard)
      .eq("id", id);

    if (error) throw error;
    return {};
  } catch (error) {
    return { error };
  }
};

export const deleteUserCard = async (id) => {
  try {
    const { error } = await supabase.from("cards").delete().eq("id", id);

    if (error) throw error;
    return {};
  } catch (error) {
    return { error };
  }
};
