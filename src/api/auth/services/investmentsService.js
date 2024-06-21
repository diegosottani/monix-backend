import { supabase } from "../../../init";

export const getInvestments = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("investments")
      .select(
        `
      id,
      user_id,
      goal_id (
        id,
        name,
        initial_value,
        deadline,
        desired_value
      ),
      category_id (
        id,
        name
      ),
      member_id (
        id,
        name
      ),
      account_id (
        id, 
        name
      ),
      date,
      value,
      description,
      status      
      `
      )
      .eq("user_id", userId);

    if (error) throw error;
    return { data };
  } catch (error) {
    return { error };
  }
};

export const createInvestment = async (userId, investmentData) => {
  try {
    const { error } = await supabase.from("investments").insert({
      user_id: userId,
      goal_id: investmentData.goal,
      category_id: investmentData.category,
      member_id: investmentData.member,
      account_id: investmentData.account,
      date: investmentData.date,
      value: investmentData.value,
      status: investmentData.status,
      description: investmentData.description,
    });

    if (error) throw error;
    return {};
  } catch (error) {
    return { error };
  }
};

export const updateInvestment = async (id, investmentData) => {
  try {
    const updatedInvestment = {
      goal_id: investmentData.goal,
      category_id: investmentData.category,
      member_id: investmentData.member,
      account_id: investmentData.account,
      date: investmentData.date,
      value: investmentData.value,
      status: investmentData.status,
      description: investmentData.description,
    };

    const { error } = await supabase.from("investments").update(updatedInvestment).eq("id", id);

    if (error) throw error;
    return {};
  } catch (error) {
    return { error };
  }
};

export const deleteInvestment = async (id) => {
  try {
    const { error } = await supabase.from("investments").delete().eq("id", id);

    if (error) throw error;
    return {};
  } catch (error) {
    return { error };
  }
};
